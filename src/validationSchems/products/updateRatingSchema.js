const Joi = require("@hapi/joi");

module.exports = Joi.object({
  id: Joi.number().required(),
  ratingValue: Joi.number().required()
});
