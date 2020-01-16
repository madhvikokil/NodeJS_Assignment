const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const { User } = require('../model/user')

router.post('/', function (req, res) {
  var token = req.headers.token
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' })

  jwt.verify(token, process.env.Token, function (err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    res.status(200).send(decoded)
    console.log('is admin : ', decoded.isAdmin)
    if (decoded.isAdmin === true) {
      router.get('/', async (req, res) => {
        User.find({}, function (error, user) {
          if (error) {
            res.send('error has occured....')
          } else {
            res.send(user)
          }
        })
      })
    }
  })
})

// router.get('/', async (req, res) => {
//     User.find({}, function (error, user) {
//       if (error) {
//         res.send('error has occured....')s
//       } else {
//         res.send(user)
//       }
//     })
//   })

module.exports = router
