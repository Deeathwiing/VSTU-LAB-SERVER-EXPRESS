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
    })
});
