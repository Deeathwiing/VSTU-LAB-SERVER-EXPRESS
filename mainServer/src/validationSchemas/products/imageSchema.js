const Joi = require("@hapi/joi");

module.exports = Joi.binary().max(1794054 * 3);
