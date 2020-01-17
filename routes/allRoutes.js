import express from 'express'
import bcrypt from 'bcrypt'
import { User, Validate } from '../model/user'
import UserActivity from '../model/userActivity'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

// SIGNUP

router.post('/signup', async (req, res) => {
  // First Validate The Request
  const { error } = Validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  // Check if this user already exisits
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(400).send('That user already exists!')
  } else {
    // Insert the new user if they do not exist yet
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
})

// LOGIN
router.post('/login', async (req, res) => {
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

  const userActivity = new UserActivity({
    id: user._id,
    ipAddress: req.ip,
    uaString: req.headers['user-agent'],
    date: new Date().toLocaleDateString()
  })
  try {
    const saveActivity = await userActivity.save()
    // res.send(saveActivity)
    console.log('Stored data ', saveActivity)
  } catch (err) {
    // res.status(400).send(err)
  }

  const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.Token)
  res.setHeader('authorization', token)
  res.send('Login Successfully')
})

function validate (req) {
  const schema = {
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(100).required()
  }

  return Joi.validate(req, schema)
}

// DASHBOARD

router.get('/dashboard', function (req, res) {
  var token = req.headers.token
  if (!token) return req.status(401).send({ auth: false, message: 'No token provided.' })

  jwt.verify(token, process.env.Token, function (err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })

    if (decoded.isAdmin === true) {
      User.find({}, function (error, user) {
        if (error) {
          res.send('error has occured....')
        } else {
          res.send(user)
          console.log(user)
        }
      })
    } else {
      res.send('Not an Admin User')
    }
  })
})

// SEARCH BY ID
router.get('/users/:id', function (req, res) {
  User.findOne({
    _id: req.params.id
  }, function (error, books) {
    if (error) {
      res.send('error has occured...q')
    } else {
      res.send(books)
    }
  })
})

// NOT LOGGED IN SINCE 5 DAYS

router.get('/useractivity', async (req, res) =>{
  let userDataStorage
  let timeLogin =[]
  let d = new Date()
  d.setDate(d.getDate() - process.env.NOT_LOGGED_IN)
  const last5Days = d.toLocaleString()
  console.log('5 days ago was: ' + last5Days)

  await UserActivity.find({}, function (error, user) {
    if (error) {
      res.send('error has occured')
    } else {
      
      for(let i=0;i<user.length ;i++) {
        timeLogin.push(user[i].id)
      }
      console.log('time login : ',timeLogin)
      // res.send(timeLogin)
    }
  })

  await User.find({}, function (error, user) {
    if (error) {
      res.send('error has occured')
    } else {
      userDataStorage.push(user)
      res.send(user)
    }
  })
})

// UPDATE

router.put('/users/:id', function (req, res) {
  User.findOneAndUpdate({
    _id: req.params.id
  },

  {
    $set:
           {
             name: req.body.name,
             lastname: req.body.lastname
           }
  },
  { new: true },
  function (error, user) {
    if (error) {
      console.log('error ocured')
    } else {
      console.log(user)
      res.send(user)
    }
  })
})
module.exports = router
