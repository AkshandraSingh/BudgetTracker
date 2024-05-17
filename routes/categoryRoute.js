const express = require('express')

const categoryController = require('../controllers/categoryController')

const categoryRouter = express.Router()

categoryRouter.post('/addCategory/:userId', categoryController.addCategory)
categoryRouter.patch('/editCategory/:categoryId', categoryController.editCategory)
categoryRouter.delete('/deleteCategory/:categoryId', categoryController.deleteCategory)

module.exports = categoryRouter
