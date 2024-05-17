const express = require('express')

const userRouter = require('./routes/userRoute')
const categoryRouter = require('./routes/categoryRoute')
const expenseRouter = require('./routes/expenseRoute')

const commonRouter = express.Router()

commonRouter.use('/user', userRouter)
commonRouter.use('/category', categoryRouter)
commonRouter.use('/expense', expenseRouter)

module.exports = commonRouter
