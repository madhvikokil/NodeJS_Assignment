import { User } from '../model/user'
import UserActivity from '../model/userActivity'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

exports.particularUser = (req, res) => {
  User.findOne({
    _id: req.params.id
  }, function (error, books) {
    if (error) {
      res.send('error has occured...q')
    } else {
      res.send(books)
    }
  })
}

exports.updateUser = (req, res) => {
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
      res.send(error)
    } else {
      res.send(user)
    }
  })
}

exports.showUserCondition = function (req, res) {
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
        }
      })
    } else {
      res.send('Not an Admin User')
    }
  })
}

exports.lastActive = async (req, res) => {
  const newDate = new Date()
  const dt = newDate.setDate(newDate.getDate() - process.env.NOT_LOGGED_IN)
  console.log(dt)
  const response = await UserActivity.find({ date: { $lt: dt } }).populate('userData').exec()
  console.log(response)
  return res.status(200).send(response)
}
