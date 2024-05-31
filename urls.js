const express = require('express')
const path = require('path')

const userRouter = require('./routes/userRoute')
const categoryRouter = require('./routes/categoryRoute')
const expenseRouter = require('./routes/expenseRoute')
const incomeRouter = require('./routes/incomeRoute')

const commonRouter = express.Router()

commonRouter.use(express.static(path.join(__dirname, 'views')));

commonRouter.use('/user', userRouter)
commonRouter.use('/category', categoryRouter)
commonRouter.use('/expense', expenseRouter)
commonRouter.use('/income', incomeRouter)
commonRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, ".", 'views', 'index.html'));
});

module.exports = commonRouter
