const express = require('express')

const expenseController = require('../controllers/expenseController')

const expenseRouter = express.Router()

expenseRouter.post('/addExpense/:userId', expenseController.addExpense)
expenseRouter.delete('/deleteExpense/:expenseId', expenseController.deleteExpense)
expenseRouter.get('/viewAllExpenses/:userId', expenseController.viewAllExpenses)
expenseRouter.post('/viewExpenseByDate/:userId', expenseController.viewExpenseByDate)

module.exports = expenseRouter
