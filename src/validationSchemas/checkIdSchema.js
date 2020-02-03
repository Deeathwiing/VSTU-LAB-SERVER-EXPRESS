const Joi = require("@hapi/joi");

module.exports = Joi.object({
  id: Joi.number()
    .min(1)
    .required()
    .messages({
      "number.min": `Id must be larger than or equal 1`,
      "any.required": `Id is a required field`
    })
});
