const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).max(15).required(),
}).options({ abortEarly: false });



module.exports = {
    addSchema,
  
};