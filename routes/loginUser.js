const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const Joi = require('joi')
const bcrypt = require('bcrypt')
// const _ = require('lodash');
const { User } = require('../model/user')
const express = require('express')
const router = express.Router()
const app = express()

router.post('/', async (req, res) => {
  // First Validate The HTTP Request
  const { error } = validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  //  Now find the user by their email address
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).send('Incorrect email or password.')
  }

  // Then validate the Credentials in MongoDB match
  // those provided in the request
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) {
    return res.status(400).send('Incorrect email or password.')
  }
  const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin}, process.env.Token)
  console.log(process.env.Token)
  res.send(token)
})

function validate (req) {
  const schema = {
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(100).required()
  }

  return Joi.validate(req, schema)
}

app.get('/me', (req, res) => {
  res.json({
    message: 'Post created'
  })
})

module.exports = router
