import Joi from 'joi';

const validateRegister = (user) => {
  const schemaTest = {
    name: Joi.string().min(5).max(100).required(),
    lastname: Joi.string().min(5).max(100).required(),
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(100).required(),
    isAdmin: Joi.boolean().required()
  };
  return Joi.validate(user, schemaTest);
};

const validateLogin = (req) => {
  const schema = {
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(100).required()
  };
  return Joi.validate(req, schema);
};

module.exports.validateRegister = validateRegister;
module.exports.validateLogin = validateLogin;
