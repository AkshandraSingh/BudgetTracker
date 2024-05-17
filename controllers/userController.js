const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userModel = require('../models/userModel')
const emailService = require('../services/emailService')

module.exports = {
    //? Register User API 🍎
    registerUser: async (req, res) => {
        try {
            const userData = new userModel(req.body)
            const isUserNameExist = await userModel.findOne({
                userName: req.body.userName
            })
            const isUserEmailExist = await userModel.findOne({
                userEmail: req.body.userEmail
            })
            const isUserPhoneExist = await userModel.findOne({
                userPhone: req.body.userPhone
            })
            if (isUserNameExist || isUserEmailExist || isUserPhoneExist) {
                return res.status(400).send({
                    success: false,
                    message: "User Name or Email or Phone Already Exist!",
                })
            }
            const hashedPassword = await bcrypt.hash(req.body.userPassword, 10)
            userData.userPassword = hashedPassword
            userData.userPreviousPasswords.push(hashedPassword)
            await userData.save()
            res.status(202).send({
                success: true,
                message: "User Created Successfully!",
                userData: userData
            })
        } catch (error) {
            res.status(500).send({
                success: true,
                message: "Error Occurs!",
                error: error.message,
            })
        }
    },

    //? Login User API 🍏
    loginUser: async (req, res) => {
        try {
            const { userAccount, userPassword } = req.body
            const isUserEmail = await userModel.findOne({
                userEmail: userAccount
            })
            const isUserName = await userModel.findOne({
                userName: userAccount
            })
            if (!isUserEmail && !isUserName) {
                return res.status(404).send({
                    success: false,
                    message: "User not found "
                })
            }
            const userData = isUserEmail || isUserName
            const isCorrectPassword = await bcrypt.compare(userPassword, userData.userPassword)
            if (isCorrectPassword) {
                const token = jwt.sign({ userData }, process.env.SECRET_KEY, { expiresIn: '1h' });
                return res.status(200).send({
                    success: true,
                    message: "Login successfully!",
                    token: token,
                })
            } else {
                res.status(400).send({
                    success: false,
                    message: "User email/phone or password is incorrect"
                })
            }
        } catch (error) {
            res.status(500).send({
                success: true,
                message: "Server error!",
                error: error.message,
            })
        }
    },

    //? Forget Password ✨
    forgetPassword: async (req, res) => {
        try {
            const { userEmail } = req.body
            const userData = await userModel.findOne({
                userEmail: userEmail
            })
            if (!userData) {
                return res.status(404).send({
                    success: false,
                    message: "User not found"
                })
            }
            const token = jwt.sign({ userData }, process.env.SECRET_KEY, { expiresIn: '1h' });
            await emailService.sendEmail(userEmail, "forgetPassword")
            return res.status(200).send({
                success: true,
                message: "Email sent successfully!",
                token: token,
            })
        } catch (error) {
            res.status(500).send({
                success: true,
                message: "Server error!",
                error: error.message,
            })
        }
    },

    //? Reset Password API 🦕
    resetPassword: async (req, res) => {
        let isPasswordExist = false
        try {
            const { newPassword, confirmPassword } = req.body
            const { userId, token } = req.params
            const isTokenCorrect = jwt.verify(token, process.env.SECRET_KEY);
            if (isTokenCorrect) {
                if (newPassword === confirmPassword) {
                    const userData = await userModel.findById(userId)
                    for (const oldPassword of userData.userPreviousPasswords) {
                        if (await bcrypt.compare(newPassword, oldPassword)) {
                            isPasswordExist = true;
                            break;
                        }
                    }
                    if (isPasswordExist) {
                        return res.status(401).json({
                            success: false,
                            message: "Don't use old passwords, try another password",
                        });
                    }
                    const bcryptPassword = await bcrypt.hash(newPassword, 10)
                    userData.userPassword = bcryptPassword
                    userData.userPreviousPasswords.push(bcryptPassword)
                    await userData.save();
                    res.status(201).json({
                        success: true,
                        message: "Password Updated",
                    });
                } else {
                    res.status(401).send({
                        success: false,
                        message: "New password or confirm password is incorrect"
                    })
                }
            } else {
                res.status(401).send({
                    success: false,
                    message: "Token is incorrect or expire"
                })
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error",
                error: error.message
            });
        }
    },

    //? Set New Password API 🐘
    setNewPassword: async (req, res) => {
        let isPasswordExist = false
        try {
            const { oldPassword, newPassword, confirmPassword } = req.body
            const { userId } = req.params
            const userData = await userModel.findById(userId)
            const isCorrectPassword = await bcrypt.compare(oldPassword, userData.userPassword)
            if (!isCorrectPassword) {
                return res.status(401).send({
                    success: false,
                    message: "Old password is incorrect"
                })
            }
            if (newPassword != confirmPassword) {
                return res.status(401).send({
                    success: false,
                    message: "New password or confirm password is incorrect"
                })
            }
            for (const oldPassword of userData.userPreviousPasswords) {
                if (await bcrypt.compare(newPassword, oldPassword)) {
                    isPasswordExist = true;
                    break;
                }
            }
            if (isPasswordExist) {
                return res.status(401).json({
                    success: false,
                    message: "Don't use old passwords, try another password",
                });
            }
            const bcryptPassword = await bcrypt.hash(newPassword, 10)
            userData.userPassword = bcryptPassword
            userData.userPreviousPasswords.push(bcryptPassword)
            await userData.save();
            res.status(201).json({
                success: true,
                message: "Password Updated",
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error",
                error: error.message
            });
        }
    },
}
