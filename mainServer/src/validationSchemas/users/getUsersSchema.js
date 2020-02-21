const Joi = require("@hapi/joi");

module.exports = Joi.object({
  amount: Joi.number()
    .required()
    .min(1)
    .messages({
      "number.base": `Invalid type. Amount must be a number`,
      "number.empty": `Please enter amount`,
      "any.required": `Amount is a required field`,
      "number.min": `Amount should have a minimum length of {#limit}`
    }),
  page: Joi.number()
    .required()
    .min(1)
    .messages({
      "number.base": `Invalid type. Page must be a number`,
      "number.empty": `Please enter page`,
      "any.required": `Page is a required field`,
      "number.min": `Page should have a minimum length of {#limit}`
    }),
  email: Joi.string()
    .allow("none")
    .min(5)
    .max(50)
    .required()
    .pattern(new RegExp(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i))
    .messages({
      "string.base": `Invalid type. Email must be a string`,
      "string.empty": `Please enter your email`,
      "string.min": `Email should have a minimum length of {#limit}`,
      "string.max": `Email should have a maximum length of {#limit}`
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
    })
});
