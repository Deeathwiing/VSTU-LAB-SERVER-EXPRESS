const Joi = require("@hapi/joi");

module.exports = Joi.object({
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
