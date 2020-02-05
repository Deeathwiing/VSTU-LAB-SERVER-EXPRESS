const Joi = require("@hapi/joi");

module.exports = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .min(5)
    .max(50)
    .pattern(new RegExp(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i))
    .messages({
      "string.base": `Invalid type. Email must be a string`,
      "string.empty": `Please enter your email`,
      "any.required": `Email is a required field`
    }),
  firstName: Joi.string()
    .min(3)
    .max(20)
    .pattern(new RegExp("[a-zA-Z]"))
    .required()
    .messages({
      "string.base": `Invalid type. First name must be a string`,
      "string.empty": `Please enter your First name`,
      "string.min": `First name should have a minimum length of {#limit}`,
      "string.max": `First name should have a maximum length of {#limit}`,
      "any.required": `First name is a required field`
    }),
  lastName: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp("[a-zA-Z]"))
    .required()
    .messages({
      "string.base": `Invalid type. Last name must be a string`,
      "string.empty": `Please enter your last name`,
      "string.min": `Last name should have a minimum length of {#limit}`,
      "string.max": `Last name should have a maximum length of {#limit}`,
      "any.required": `Last name is a required field`
    }),

  password: Joi.string()
    .required()
    .min(3)
    .max(20)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .messages({
      "string.empty": `Please enter your password`,
      "string.min": `Password should have a minimum length of {#limit}`,
      "string.max": `Password should have a maximum length of {#limit}`,
      "any.required": `Password is a required field`
    })
});
