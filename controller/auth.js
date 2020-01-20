import bcrypt from 'bcrypt'
import { User, Validate } from '../model/user'
import UserActivity from '../model/userActivity'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

exports.signup = async (req, res) => {
  // First Validate The Request
  const { error } = Validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(400).send('That user already exists!')
  } else {
    user = new User({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin
    })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    res.send('Signed up Successfully')
  }
}

exports.login = async (req, res) => {
  // First Validate The HTTP Request
  const { error } = validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).send('Incorrect email or password.')
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) {
    return res.status(400).send('Incorrect email or password.')
  }

  const userActivity = new UserActivity({
    id: user._id,
    ipAddress: req.ip,
    uaString: req.headers['user-agent'],
    date: new Date().toLocaleDateString()
  })
  await userActivity.save()
  try {
    res.send('Logged Successfully')
  } catch (err) {
    res.status(400).send(err)
  }

  const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.Token)
  res.setHeader('authorization', token)
  res.send('Login Successfully')
}
function validate (req) {
  const schema = {
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(100).required()
  }
  return Joi.validate(req, schema)
}
