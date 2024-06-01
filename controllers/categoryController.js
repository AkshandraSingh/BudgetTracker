const categoryModel = require('../models/categoryModel')
const categoryLogger = require('../utils/categoryLogger/categoryLogger')

module.exports = {
    //* Add Category API 💡
    addCategory: async (req, res) => {
        try {
            const { userId } = req.params
            const isCategoryAlreadyExist = await categoryModel.findOne({
                userId: userId,
                categoryName: req.body.categoryName
            })
            if (isCategoryAlreadyExist) {
                categoryLogger.error("Category already exist!")
                return res.status(400).send({
                    success: false,
                    message: "Category already exist!"
                })
            }
            if (req.body.categoryLimit <= 0) {
                categoryLogger.error("Category limit must be greater than 0")
                return res.status(400).send({
                    success: false,
                    message: "Category limit must be greater than 0"
                })
            }
            const categoryData = await categoryModel(req.body)
            categoryData.categoryBalance = req.body.categoryLimit
            categoryData.userId = userId
            categoryData.save()
            categoryLogger.info("Category Created Successfully!")
            res.status(202).send({
                success: true,
                message: "Category Created Successfully!",
                categoryData: categoryData
            })
        } catch (error) {
            categoryLogger.error(`Error: ${error.message}`)
            return res.status(400).send({
                success: false,
                message: "Error Occurs!",
                error: error.message,
            })
        }
    },

    //* Edit Category API 🚀
    editCategory: async (req, res) => {
        try {
            const { categoryId } = req.params
            const categoryData = await categoryModel.findById(categoryId)
            const isCategoryExist = await categoryModel.findOne({
                categoryName: req.body.categoryName,
                userId: categoryData.userId
            })
            if (isCategoryExist) {
                categoryLogger.error('Category already exist!')
                return res.status(400).send({
                    success: false,
                    message: "Category already exist!"
                })
            }
            if (req.body.categoryLimit <= 0) {
                categoryLogger.error("Category limit must be greater than 0")
                return res.status(400).send({
                    success: false,
                    message: "Category limit must be greater than 0"
                })
            }
            //! Check If Category Balance is greater than category limit , It automatic 0 that category balance and update category .
            if (req.body.categoryLimit < categoryData.categoryBalance) {
                const editedCategory = await categoryModel.findByIdAndUpdate(categoryId, {
                    categoryName: req.body.categoryName || undefined,
                    categoryDescription: req.body.categoryDescription || undefined,
                    categoryLimit: req.body.categoryLimit || undefined,
                    categoryBalance: req.body.categoryLimit,
                }, { new: true })
                categoryLogger.info('Category Updated Successfully!')
                res.status(202).send({
                    success: true,
                    message: "Category Updated Successfully!",
                    editedCategory: editedCategory
                })
            } else {
                //! Otherwise only updated the data (category balance remain same) .
                const editedCategory = await categoryModel.findByIdAndUpdate(categoryId, {
                    categoryName: req.body.categoryName || undefined,
                    categoryDescription: req.body.categoryDescription || undefined,
                    categoryLimit: req.body.categoryLimit || undefined,
                }, { new: true })
                categoryLogger.info('Category Updated Successfully!')
                res.status(202).send({
                    success: true,
                    message: "Category Updated Successfully!",
                    editedCategory: editedCategory
                })
            }
        } catch (error) {
            categoryLogger.error(`Error: ${error.message}`)
            res.status(500).send({
                success: true,
                message: "Error Occurs!",
                error: error.message,
            })
        }
    },

    //? Delete Category API 💀
    deleteCategory: async (req, res) => {
        try {
            const { categoryId } = req.params
            const deletedCategory = await categoryModel.findByIdAndDelete(categoryId)
            categoryLogger.info("Category Deleted Successfully!")
            res.status(202).send({
                success: true,
                message: "Category Deleted Successfully!",
                deletedCategory: deletedCategory
            })
        } catch (error) {
            categoryLogger.error(`Error: ${error.message}`)
            res.status(500).send({
                success: true,
                message: "Error Occurs!",
                error: error.message,
            })
        }
    },

    //? View All Categories API 👀
    viewAllCategories: async (req, res) => {
        try {
            const { userId } = req.params
            const allCategories = await categoryModel.find({ userId: userId }).select("categoryName categoryBalance")
            if (allCategories.length <= 0) {
                categoryLogger.error("No Category Found!")
                return res.status(404).send({
                    success: false,
                    message: "No Category Found!"
                })
            }
            categoryLogger.info("All Categories!")
            res.status(202).send({
                success: true,
                message: "All Categories",
                allCategories: allCategories
            })
        } catch (error) {
            categoryLogger.error(`Error: ${error.message}`)
            res.status(500).send({
                success: true,
                message: "Error Occurs!",
                error: error.message,
            })
        }
    },

    //? View Category API 🍎
    viewCategory: async (req, res) => {
        try {
            const { categoryId } = req.params
            const categoryData = await categoryModel.findById(categoryId)
            categoryLogger.info("Category Data!")
            res.status(202).send({
                success: true,
                message: "Category Data!",
                categoryData: categoryData
            })
        } catch (error) {
            categoryLogger.error(`Error: ${error.message}`)
            res.status(500).send({
                success: true,
                message: "Error Occurs!",
                error: error.message,
            })
        }
    },

    //? Search Category API 💡
    searchCategory: async (req, res) => {
        try {
            const { userId, categoryName } = req.params
            const searchCategory = await categoryModel.find({
                userId: userId,
                categoryName: {
                    $regex: categoryName,
                    $options: "i"
                }
            }).select("categoryName categoryBalance")
            if (searchCategory.length <= 0) {
                categoryLogger.error("No Category Found!")
                return res.status(404).send({
                    success: false,
                    message: "No Category Found!"
                })
            }
            categoryLogger.info("Search Category!")
            res.status(202).send({
                success: true,
                message: "Search Category!",
                searchCategory: searchCategory
            })
        } catch (error) {
            categoryLogger.error(`Error: ${error.message}`)
            res.status(500).send({
                success: true,
                message: "Error Occurs!",
                error: error.message,
            })
        }
    }
}
