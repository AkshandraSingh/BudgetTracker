const express = require('express')

const expenseController = require('../controllers/expenseController')

const expenseRouter = express.Router()

expenseRouter.post('/addExpense/:userId', expenseController.addExpense)

module.exports = expenseRouter
