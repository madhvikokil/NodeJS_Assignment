import mongoose from 'mongoose'

const UserActivity = new mongoose.Schema({
  ipAddress: {
    type: String
  },
  uaString: {
    type: String
  },
  date: {
    type: Date
  },
  id: {
    type: String
  }
}, { collection: 'userActivity' })

module.exports = mongoose.model('userActivity', UserActivity)
