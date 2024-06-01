const express = require('express')

const incomeController = require('../controllers/incomeController')

const incomeRouter = express.Router()

incomeRouter.post('/createIncome/:userId', incomeController.createIncome)
incomeRouter.patch('/updateIncome/:incomeId', incomeController.updateIncome)
incomeRouter.delete('/deleteIncome/:incomeId', incomeController.deleteIncome)
incomeRouter.get('/viewIncomeSources/:userId', incomeController.viewIncomeSources)
incomeRouter.get('/searchIncome/:incomeSource', incomeController.searchIncome)
incomeRouter.get('/listIncomeSources/:userId', incomeController.listIncomeSources)

module.exports = incomeRouter
