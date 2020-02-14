const Joi = require("@hapi/joi");

module.exports = Joi.object({
  id: Joi.number()
    .required()
    .min(1)
    .messages({
      "number.base": `Invalid type. Id must be a number`,
      "number.min": `Id should have a minimum length of {#limit}`
    }),

  ratingValue: Joi.number()
    .required()
    .min(1)
    .messages({
      "number.base": `Invalid type. RatingValue must be a number`,
      "number.min": `RatingValue should have a minimum length of {#limit}`
    })
});
