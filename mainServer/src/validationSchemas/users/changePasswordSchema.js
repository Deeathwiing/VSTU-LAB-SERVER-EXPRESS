const Joi = require("@hapi/joi");

module.exports = Joi.object({
  prevPassword: Joi.string()
    .min(3)
    .max(20)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.base": `Invalid type. Previous password must be a string`,
      "string.empty": `Please enter your previous password`,
      "string.pattern.base": `Previous password must consists of letters only`,
      "string.min": `Previous password should have a minimum length of {#limit}`,
      "string.max": `Previous password should have a maximum length of {#limit}`,
      "any.required": `Previous password is a required field`
    }),
  newPassword: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.base": `Invalid type. New Password must be a string`,
      "string.empty": `Please enter your New Password`,
      "string.min": `New Password should have a minimum length of {#limit}`,
      "string.max": `New Password should have a maximum length of {#limit}`,
      "any.required": `New Password is a required field`
    })
});
