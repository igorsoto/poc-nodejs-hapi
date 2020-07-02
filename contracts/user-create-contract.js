const Joi = require("@hapi/joi");

module.exports = Joi.object({
  name: Joi.string().required(),
  is_enabled: Joi.boolean()
});
