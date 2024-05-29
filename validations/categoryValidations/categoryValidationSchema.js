const joi = require('joi');

const categoryValidationSchema = {
    addCategory: joi.object({
        categoryName: joi
            .string()
            .max(20)
            .min(3)
            .message({
                "string-min": "{#label} should be at least {#limit} characters",
                "string-max": "{#label} should be at most {#limit} characters",
            })
            .required(),
        categoryDescription: joi
            .string()
            .min(11)
            .max(200)
            .message({
                "string-min": "{#label} should be at least {#limit} characters",
                "string-max": "{#label} should be at most {#limit} characters",
            }),
        categoryLimit: joi
            .number()
            .required(),
    }).unknown(true),
};

module.exports = categoryValidationSchema;
