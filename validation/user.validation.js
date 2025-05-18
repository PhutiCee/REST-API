const Joi = require("joi");

const UserSchemaValidation = Joi.object({
    name: Joi.string().required().min(3).max(30).messages({
        "string.empty": "Full name is required",
        "string.min": "Minimum value of Name must be of 3 characters",
        "string.max": "Maximum value of Name must be of 30 characters",
        "any.required": "Full name is required"
    }),
    email: Joi.string().required().email().messages({
        "any.required": "Email value is required",
        "string.empty": "Email value is required",
        "string.email": "Email value is not a valid email pattern"
    }),
    password: Joi.string().required().min(5).messages({
        "any.required": "Passowrd is required",
        "string.empty": "Password is required",
        "string.min": "Minimum value of password is of 5 characters"
    }),
    gender: Joi.string().valid("male", "female", "other").required().messages({
        "any.only": "Gender value must match either with male, female and other",
        "any.required": "Gender is required"
    })
});

module.exports = {
    UserSchemaValidation
};