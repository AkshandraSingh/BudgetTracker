const express = require('express')

const incomeController = require('../controllers/incomeController')

const incomeRouter = express.Router()

incomeRouter.post('/createIncome/:userId', incomeController.createIncome)
incomeRouter.patch('/updateIncome/:incomeId', incomeController.updateIncome)
incomeRouter.delete('/deleteIncome/:incomeId', incomeController.deleteIncome)

module.exports = incomeRouter
