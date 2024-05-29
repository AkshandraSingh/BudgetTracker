const joi = require('joi');

const expenseValidationSchema = {
    addExpense: joi.object({
        expenseName: joi
            .string()
            .max(20)
            .min(3)
            .message({
                "string-min": "{#label} should be at least {#limit} characters",
                "string-max": "{#label} should be at most {#limit} characters",
            })
            .required(),
        expenseDescription: joi
            .string()
            .min(11)
            .max(200)
            .message({
                "string-min": "{#label} should be at least {#limit} characters",
                "string-max": "{#label} should be at most {#limit} characters",
            }),
        expenseAmount: joi
            .number()
            .required(),
        expenseCategory: joi
            .string()
            .max(20)
            .min(3)
            .message({
                "string-min": "{#label} should be at least {#limit} characters",
                "string-max": "{#label} should be at most {#limit} characters",
            })
            .required(),
    }).unknown(true),
};

module.exports = expenseValidationSchema;
