const Joi = require("@hapi/joi");

module.exports = Joi.object({
  id: Joi.number().integer().positive()
});
