const express = require('express')

const incomeController = require('../controllers/incomeController')
const incomeValidator = require('../validations/incomeValidations/incomeValidator')

const incomeRouter = express.Router()

incomeRouter.post('/createIncome/:userId', incomeValidator.addCategoryValidation, incomeController.createIncome)
incomeRouter.patch('/updateIncome/:incomeId', incomeController.updateIncome)
incomeRouter.delete('/deleteIncome/:incomeId', incomeController.deleteIncome)
incomeRouter.get('/viewIncomeSources/:userId', incomeController.viewIncomeSources)
incomeRouter.get('/searchIncome/:userId/:incomeSource', incomeController.searchIncome)
incomeRouter.get('/listIncomeSources/:userId', incomeController.listIncomeSources)

module.exports = incomeRouter
