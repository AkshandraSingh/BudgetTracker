const express = require('express')

const categoryController = require('../controllers/categoryController')

const categoryRouter = express.Router()

categoryRouter.post('/addCategory/:userId', categoryController.addCategory)
categoryRouter.patch('/editCategory/:categoryId', categoryController.editCategory)
categoryRouter.delete('/deleteCategory/:categoryId', categoryController.deleteCategory)
categoryRouter.get('/viewAllCategories/:userId', categoryController.viewAllCategories)
categoryRouter.get('/viewCategory/:categoryId', categoryController.viewCategory)

module.exports = categoryRouter
