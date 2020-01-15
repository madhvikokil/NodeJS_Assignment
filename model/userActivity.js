const mongoose = require('mongoose')
const { Joi } = require('joi')
const UserActivity = mongoose.model('UserActivity', new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true
  },
  uaString: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
}, { collection: 'userActivity' }))

const validateActivity = (userActivity) => {
  const schemaTest = {
    ipAddress: Joi.string().required(),
    uaString: Joi.string().required(),
    date: Joi.string().required()

  }

  return Joi.validate(userActivity, schemaTest)
}

module.UserActivity = UserActivity
module.Validate = validateActivity
