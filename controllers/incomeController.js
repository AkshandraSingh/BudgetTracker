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
            res.status(500).send({
                success: true,
                message: "Error Occurs!",
                error: error.message,
            })
        }
    },
}
