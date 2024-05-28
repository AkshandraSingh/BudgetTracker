const express = require('express')

const userController = require('../controllers/userController')
const { upload } = require('../middleware/userImageStorage')

const userRouter = express.Router()

userRouter.post('/registerUser', userController.registerUser)
userRouter.post('/loginUser', userController.loginUser)
userRouter.post('/forgetPassword', userController.forgetPassword)
userRouter.post('/resetPassword/:userId/:token', userController.resetPassword)
userRouter.post('/setNewPassword/:userId', userController.setNewPassword)
userRouter.post('/changeProfilePic/:userId', upload.single('userProfilePic'), userController.changeProfilePic)

module.exports = userRouter
