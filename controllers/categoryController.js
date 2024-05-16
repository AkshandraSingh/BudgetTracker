const categoryModel = require('../models/categoryModel')

module.exports = {
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
}
