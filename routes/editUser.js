const express = require('express')
const router = express.Router()
const { User } = require('../model/user')

router.put('/:id', function (req, res) {
  User.findOneAndUpdate({
    _id: req.params.id
  },
  {
    $set:
           {
             name: req.body.name,
             lastname: req.body.lastname,
             email: req.body.email,
             password: req.body.password,
             upsert: true
           },
    function (error, user) {
      if (error) {
        console.log('error ocured')
      } else {
        console.log(user)
        res.status(204)
      }
    }
  })
})

module.exports = router
