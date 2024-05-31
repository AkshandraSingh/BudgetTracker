const express = require('express')

const incomeController = require('../controllers/incomeController')

const incomeRouter = express.Router()

incomeRouter.post('/createIncome/:userId', incomeController.createIncome)

module.exports = incomeRouter
