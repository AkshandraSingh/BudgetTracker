const express = require('express')

const expenseController = require('../controllers/expenseController')
const expenseValidator = require('../validations/expenseValidations/expenseValidator')

const expenseRouter = express.Router()

expenseRouter.post('/addExpense/:userId', expenseValidator.addCategoryValidation, expenseController.addExpense)
expenseRouter.delete('/deleteExpense/:expenseId', expenseController.deleteExpense)
expenseRouter.get('/viewAllExpenses/:userId', expenseController.viewAllExpenses)
expenseRouter.post('/viewExpenseByDate/:userId', expenseController.viewExpenseByDate)

module.exports = expenseRouter
