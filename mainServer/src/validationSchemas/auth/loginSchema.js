const Joi = require("@hapi/joi");

module.exports = Joi.object({
  email: Joi.string()
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
  password: Joi.string()
    .min(3)
    .max(20)
    .required()
    .pattern(new RegExp("^[A-Za-z0-9]{3,30}$"))
    .messages({
      "string.empty": `Please enter your Password`,
      "string.min": `Password should have a minimum length of {#limit}`,
      "string.max": `Password should have a maximum length of {#limit}`
    })
});
