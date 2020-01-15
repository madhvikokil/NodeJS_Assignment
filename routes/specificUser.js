// data fetching of a particular user
const express = require('express')
const router = express.Router()
const { User } = require('../model/user')

router.get('/:id', (req, res) => {
  User.findOne({
    _id: req.params.id
  }, (error, books) => {
    if (error) {
      res.send('error has occured')
    } else {
      res.send(books)
    }
  })
})

router.put('/:id', (req, res) => {
  User.findOneAndUpdate({
    _id: req.params.id
  },
  {
    $set:
         {
           name: req.body.name,
        //    lastname: req.body.lastname,
        //    email: req.body.email,
        //    password: req.body.password,
           upsert: true
         },
    function (error, newEmployee) {
      if (error) {
        console.log('error ocured')
      } else {
        console.log(newEmployee)
        res.status(204)
      }
    }
  })
})

module.exports = router
