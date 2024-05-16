const express = require('express')

const categoryController = require('../controllers/categoryController')

const categoryRouter = express.Router()

categoryRouter.post('/addCategory/:userId', categoryController.addCategory)

module.exports = categoryRouter
