const incomeValidationSchema = require('./incomValidationSchema')

module.exports = {
    addCategoryValidation: async (req, res, next) => {
        const value = await incomeValidationSchema.createIncome.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                success: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },
}
