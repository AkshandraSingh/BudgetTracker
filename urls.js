const express = require('express')

const userRouter = require('./routes/userRoute')
const categoryRouter = require('./routes/categoryRoute')

const commonRouter = express.Router()

commonRouter.use('/user', userRouter)
commonRouter.use('/category', categoryRouter)

module.exports = commonRouter
