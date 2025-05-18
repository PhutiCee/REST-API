const Joi = require("joi");

const PostSchemaValidation = Joi.object({
    title: Joi.string().required().min(10).messages({
        "any.required": "Post title is required",
        "string.min": "Post title must be minimum length of 10 characters",
        "string.empty": "Post title is required"
    }),
    content: Joi.string().messages({
        "string.empty": "Content must to pass"
    }),
    status: Joi.string().required().valid("draft", "published").messages({
        "any.required": "Status is required",
        "string.empty": "Status is required",
        "any.only": "Status must be of either draft or published"
    }),
    bannerImage: Joi.string().messages({
        "string.empty": "Banner image must be uploaded"
    }),
});

module.exports = {
    PostSchemaValidation
}