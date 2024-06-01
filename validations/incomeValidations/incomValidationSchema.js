const joi = require('joi');

const incomeValidationSchema = {
    createIncome: joi.object({
        incomeSource: joi
            .string()
            .max(20)
            .min(3)
            .message({
                "string-min": "{#label} should be at least {#limit} characters",
                "string-max": "{#label} should be at most {#limit} characters",
            })
            .required(),
        incomeAmount: joi
            .number()
            .required(),
    }).unknown(true),
};

module.exports = incomeValidationSchema;
