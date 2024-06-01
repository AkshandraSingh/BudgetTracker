const express = require('express')

const categoryController = require('../controllers/categoryController')
const categoryValidator = require('../validations/categoryValidations/categoryValidator')

const categoryRouter = express.Router()

categoryRouter.post('/addCategory/:userId', categoryValidator.addCategoryValidation, categoryController.addCategory)
categoryRouter.patch('/editCategory/:categoryId', categoryController.editCategory)
categoryRouter.delete('/deleteCategory/:categoryId', categoryController.deleteCategory)
categoryRouter.get('/viewAllCategories/:userId', categoryController.viewAllCategories)
categoryRouter.get('/viewCategory/:categoryId', categoryController.viewCategory)
categoryRouter.get('/searchCategory/:userId/:categoryName', categoryController.searchCategory)

module.exports = categoryRouter
