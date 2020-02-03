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

  withImg: Joi.boolean()
    .required()
    .messages({
      "boolean.base": `Invalid type. WithImg must be a string`,
      "boolean.empty": `Please enter WithImg`,
      "any.required": `WithImg is a required field`
    }),
  sortByName: Joi.boolean()
    .required()
    .messages({
      "boolean.base": `Invalid type. SortByName must be a string`,
      "boolean.empty": `Please enter SortByName`,
      "any.required": `SortByName is a required field`
    }),
  sortByDate: Joi.boolean()
    .required()
    .messages({
      "boolean.base": `Invalid type. SortByDate must be a string`,
      "boolean.empty": `Please enter SortByDate`,
      "any.required": `SortByDate is a required field`
    })
});
