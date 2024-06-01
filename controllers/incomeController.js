const incomeModel = require('../models/incomeModel')
const incomeLogger = require('../utils/incomeLogger/incomeLogger')

module.exports = {
    //? Create Income API 🎯
    createIncome: async (req, res) => {
        try {
            const { userId } = req.params
            const incomeData = new incomeModel(req.body)
            const isIncomeAlreadyExist = await incomeModel.findOne({
                userId: userId,
                incomeName: req.body.incomeName
            })
            if (isIncomeAlreadyExist) {
                incomeLogger.error('Income already exist!')
                return res.status(400).send({
                    success: false,
                    message: "Income already exist!"
                })
            }
            incomeData.userId = userId
            await incomeData.save()
            incomeLogger.info("Income Added Successfully!")
            res.status(202).send({
                success: true,
                message: "Income Added Successfully!",
                incomeData: incomeData,
            })
        } catch (error) {
            incomeLogger.error(`Server Error: ${error.message}`)
            res.status(500).send({
                success: true,
                message: "Error Occurs!",
                error: error.message,
            })
        }
    },

    //? Update Income API 👀
    updateIncome: async (req, res) => {
        try {
            const { incomeId } = req.params
            const incomeData = await incomeModel.findById(incomeId)
            const realIncomeSource = incomeData.incomeSource.toLowerCase()
            if (realIncomeSource === req.body.incomeSource.toLowerCase()) {
                incomeLogger.error('Income already exist!')
                return res.status(400).send({
                    success: false,
                    message: "This name income is already exist!"
                })
            }
            const editedIncome = await incomeModel.findByIdAndUpdate(
                incomeId,
                req.body,
                { new: true }
            )
            incomeLogger.info("Income Updated Successfully!")
            res.status(202).send({
                success: true,
                message: "Income Updated Successfully!",
                editedIncome: editedIncome
            })
        } catch (error) {
            incomeLogger.error(`Error: ${error.message}`)
            res.status(500).send({
                success: true,
                message: "Error Occurs!",
                error: error.message,
            })
        }
    },

    //? Delete Income API 🗑
    deleteIncome: async (req, res) => {
        try {
            const { incomeId } = req.params
            const deletedIncome = await incomeModel.findByIdAndDelete(incomeId)
            incomeLogger.info("Income Deleted Successfully!")
            res.status(202).send({
                success: true,
                message: "Income Deleted Successfully!",
                deletedIncome: deletedIncome
            })
        } catch (error) {
            incomeLogger.error(`Error: ${error.message}`)
            res.status(500).send({
                success: true,
                message: "Error Occurs!",
                error: error.message,
            })
        }
    },

    //? View Income Sources API 🚀
    viewIncomeSources: async (req, res) => {
        try {
            const { userId } = req.params
            const incomeSources = await incomeModel.find({ userId: userId })
            incomeLogger.info("Income Sources Fetched Successfully!")
            res.status(202).send({
                success: true,
                message: "Income Sources Fetched Successfully!",
                incomeSources: incomeSources
            })
        } catch (error) {
            incomeLogger.error(`Error: ${error.message}`)
            res.status(500).send({
                success: true,
                message: "Error Occurs!",
                error: error.message,
            })
        }
    },

    //? Search Income API 🔎
    searchIncome: async (req, res) => {
        try {
            const { userId, incomeSource } = req.params
            const searchData = await incomeModel.find({
                userId: userId,
                categoryName: {
                    $regex: incomeSource,
                    $options: "i"
                }
            })
            if (searchData.length <= 0) {
                incomeLogger.error("No Income Found in Search!")
                return res.status(404).send({
                    success: false,
                    message: "No Income Found in Search!"
                })
            }
            incomeLogger.info("Income Searched Successfully!")
            res.status(202).send({
                success: true,
                message: "Income Searched Successfully!",
                searchData: searchData
            })
        } catch (error) {
            incomeLogger.error(`Error: ${error.message}`)
            res.status(500).send({
                success: true,
                message: "Error Occurs!",
                error: error.message,
            })
        }
    },

    //? All Income Sources ✨
    listIncomeSources: async (req, res) => {
        try {
            const { userId } = req.params
            const listIncomeSource = await incomeModel.find({
                userId: userId
            })
            if (listIncomeSource.length <= 0) {
                incomeLogger.error("No Income Found!")
                return res.status(404).send({
                    success: false,
                    message: "No Income Found!"
                })
            }
            incomeLogger.info("All Income Sources!")
            res.status(202).send({
                success: true,
                message: "All Income Sources",
                allIncomeSources: listIncomeSource
            })
        } catch (error) {
            incomeLogger.error(`Error: ${error.message}`)
            res.status(500).send({
                success: true,
                message: "Error Occurs!",
                error: error.message,
            })
        }
    },
}
