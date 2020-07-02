const Joi = require("@hapi/joi");

module.exports = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  is_enabled: Joi.boolean().required()
}).label("UserResponseContract");
