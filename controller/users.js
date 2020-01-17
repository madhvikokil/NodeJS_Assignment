import { User } from '../model/user'
import jwt from 'jsonwebtoken'

exports.particular_user = (req, res) => {
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

exports.update_user = (req, res) => {
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
}

exports.show_user_condition = function (req, res) {
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
}