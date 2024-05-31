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
}
