const Joi = require("@hapi/joi");

module.exports = Joi.object({
  picture: Joi.binary(),

  title: Joi.string()
    .required()
    .messages({
      "string.base": `Invalid type. Title must be a string`,
      "string.empty": `Please enter product title`,
      "any.required": `Title is a required field`
    }),
  description: Joi.string()
    .max(1000)
    .required()
    .messages({
      "string.base": `Invalid type. Description must be a string`,
      "string.empty": `Please enter product description`,
      "string.max": `Description should have a maximum length of {#limit}`,
      "any.required": `Description is a required field`
    }),

  price: Joi.number()
    .positive()
    .allow(0)
    .required()
    .messages({
      "number.base": `Invalid type. Description must be a number`,
      "number.empty": `Please enter product price`,
      "number.positive": `Invalid price, the price must be a positive number`
    }),
  tags: Joi.string()
    .required()
    .messages({
      "string.base": `Invalid type. Tags must be a string`,
      "string.empty": `Please enter product tags`,
      "any.required": `Tags are a required field`
    }),
  amount: Joi.number()
    .required()
    .positive()
    .allow(0)
    .messages({
      "number.base": `Invalid type. Amount must be a number`,
      "number.empty": `Please enter product amount`,
      "number.positive": `Invalid amount, the amount must be a positive number`
    })
});
