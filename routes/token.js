const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const { User } = require('../model/user')

router.get('/', function (req, res) {
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

module.exports = router
