const expenseModel = require('../models/expenseModel')
const categoryModel = require('../models/categoryModel')
const userModel = require('../models/userModel')
const emailService = require('../services/emailService')

module.exports = {
    addExpense: async (req, res) => {
        try {
            const { userId } = req.params
            const expenseData = new expenseModel(req.body)
            const categoryData = await categoryModel.findOne({
                categoryName: expenseData.expenseCategory,
                userId: userId
            })
            const userData = await userModel.findById(userId)
            if (!categoryData) {
                return res.status(404).send({
                    success: false,
                    message: "Category Not Found!"
                })
            }
            if (categoryData.categoryBalance < expenseData.expenseAmount) {
                return res.status(400).send({
                    success: false,
                    message: "Category Balance is not enough!"
                })
            }
            const realBalance = categoryData.categoryBalance - expenseData.expenseAmount
            if (realBalance <= 50) {
                //! Send a alert email to use if category balance is lower than 50
                await emailService.sendEmail(userData.userEmail, "lowBalance")
            }
            expenseData.userId = userId
            categoryData.categoryBalance = realBalance
            await categoryData.save()
            await expenseData.save()
            res.status(202).send({
                success: true,
                message: "Expense Added Successfully!",
            })
        } catch (error) {
            res.status(500).send({
                success: true,
                message: "Error Occurs!",
                error: error.message,
            })
        }
    },

    deleteExpense: async (req, res) => {
        try {
            const { expenseId } = req.params
            const expenseData = await expenseModel.findById(expenseId)
            const categoryData = await categoryModel.findOne({
                categoryName: expenseData.expenseCategory,
                userId: expenseData.userId
            })
            const updateCategoryBalance = categoryData.categoryBalance + expenseData.expenseAmount
            categoryData.categoryBalance = updateCategoryBalance
            await expenseModel.findByIdAndDelete(expenseId)
            await categoryData.save()
            res.status(200).send({
                success: true,
                message: "Expense Deleted Successfully!"
            })
        } catch (error) {
            res.status(500).send({
                success: true,
                message: "Error Occurs!",
                error: error.message,
            })
        }
    },

    viewAllExpenses: async (req, res) => {
        try {
            const { userId } = req.params
            const allExpenses = await expenseModel.find({
                userId: userId
            })
            res.status(200).send({
                success: true,
                message: "All Expenses",
                allExpenses: allExpenses
            })
        } catch (error) {
            res.status(500).send({
                success: true,
                message: "Error Occurs!",
                error: error.message,
            })
        }
    },

    viewExpenseByDate: async (req, res) => {
        try {
            const { userId } = req.params
            const { expenseStartDate, expenseEndDate } = req.body
            //? Converting in date 👍🏻
            const startDate = new Date(expenseStartDate);
            const endDate = new Date(expenseEndDate);
            endDate.setDate(endDate.getDate() + 1);
            const expenseByDate = await expenseModel.find({
                userId: userId,
                createdAt: {
                    $gte: startDate,
                    $lt: endDate
                }
            });
            if (expenseByDate.length <= 0) {
                return res.status(404).send({
                    success: false,
                    message: "No Expense Found!"
                })
            }
            res.status(200).send({
                success: true,
                message: "Expense By Date",
                expenseByDate: expenseByDate
            });
        } catch (error) {
            res.status(500).send({
                success: true,
                message: "Error Occurs!",
                error: error.message,
            })
        }
    }
}
