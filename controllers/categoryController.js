const categoryModel = require('../models/categoryModel')

module.exports = {
    //* Add Category API 💡
    addCategory: async (req, res) => {
        const { userId } = req.params
        const isCategoryAlreadyExist = await categoryModel.findOne({
            userId: userId,
            categoryName: req.body.categoryName
        })
        if (isCategoryAlreadyExist) {
            return res.status(400).send({
                success: false,
                message: "Category already exist!"
            })
        }
        if (req.body.categoryLimit <= 0) {
            return res.status(400).send({
                success: false,
                message: "Category limit must be greater than 0"
            })
        }
        const categoryData = await categoryModel(req.body)
        categoryData.categoryBalance = req.body.categoryLimit
        categoryData.userId = userId
        categoryData.save()
        res.status(202).send({
            success: true,
            message: "Category Created Successfully!",
            categoryData: categoryData
        })
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
                return res.status(400).send({
                    success: false,
                    message: "Category already exist!"
                })
            }
            if (req.body.categoryLimit <= 0) {
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
                res.status(202).send({
                    success: true,
                    message: "Category Updated Successfully!",
                    editedCategory: editedCategory
                })
            }
        } catch (error) {
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
            res.status(202).send({
                success: true,
                message: "Category Deleted Successfully!",
                deletedCategory: deletedCategory
            })
        } catch (error) {
            res.status(500).send({
                success: true,
                message: "Error Occurs!",
                error: error.message,
            })
        }
    },
}
