const mongoose = require('mongoose')
const Joi = require('joi')

const User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxLength: 100
  },
  lastname: {
    type: String,
    required: true,
    minlength: 5,
    maxLength: 100
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxLength: 100
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  isAdmin: {
    type: String,
    required: true
  }

}, { collection: 'userData' }))

const validateUser = (user) => {
  const schemaTest = {
    name: Joi.string().min(5).max(100).required(),
    lastname: Joi.string().min(5).max(100).required(),
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(100).required(),
    isAdmin: Joi.string().required()
  }
  return Joi.validate(user, schemaTest)
}

exports.User = User
exports.Validate = validateUser
