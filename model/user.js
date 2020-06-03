import mongoose from 'mongoose';

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
    type: Boolean,
    required: true
  }

}, { collection: 'userData' }));

exports.User = User;
