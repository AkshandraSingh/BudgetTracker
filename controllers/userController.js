const bcrypt = require('bcrypt')

const userModel = require('../models/userModel')

module.exports = {
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
    }
}
