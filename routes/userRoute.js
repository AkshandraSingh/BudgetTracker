const express = require('express')

const userController = require('../controllers/userController')
const { upload } = require('../middleware/userImageStorage')
const userValidator = require('../validations/userValidations/userValidator')

const userRouter = express.Router()

userRouter.post('/registerUser', userValidator.registerUserValidation, userController.registerUser)
userRouter.post('/loginUser', userValidator.loginUserValidation, userController.loginUser)
userRouter.post('/forgetPassword', userController.forgetPassword)
userRouter.post('/resetPassword/:userId/:token', userValidator.resetPasswordValidation, userController.resetPassword)
userRouter.post('/setNewPassword/:userId', userValidator.setNewPasswordValidation, userController.setNewPassword)
userRouter.post('/changeProfilePic/:userId', upload.single('userProfilePic'), userController.changeProfilePic)

module.exports = userRouter
