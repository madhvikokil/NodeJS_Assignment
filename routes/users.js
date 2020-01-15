// import express from 'express'
// let router = express.Router()
// let user = require('../Model/user')

// /* GET users listing. */
// router.get('login', function (req, res, next) {
//   res.send('login page. <h1> pppppp </h1>');
// });

// router.get('/signup', function (req, res, next) {
//   res.send('signup page');
// });

// // register data
// router.post('/signup', function (req, res, next) {
//   let name = req.body.name
//   let lastname = req.body.lastname
//   let username = req.body.username
//   let password = req.body.password
//   let password2 = req.body.password

//   // validation of the inputs

//   req.checkBody('name', 'Name is required').notEmpty()
//   req.checkBody('lastname', 'Last name is required').notEmpty()
//   req.checkBody('email', 'Email is required').notEmpty()
//   req.checkBody('email', 'Email is not valid').isEmail()
//   req.checkBody('password', 'Password is required').notEmpty()
//   req.checkBody('password2', 'Password2 do not match').equals(req.body.password)

//   let errors = req.validationErrors()

//   if(errors) {
//     res.render('users/signup',{
//       errors:errors
//     })

//   } else{
//     let newUser = new newUser({
//       name: name,
//       lastname: lastname,
//       email: email,
//       password: password
//     })
//   }

// });

// module.exports = router;
const express = require('express')


const bcrypt = require('bcrypt')
const { User, Validate } = require('../model/user')
const router = express.Router()

router.post('/', async (req, res) => {
  // First Validate The Request
  const { error } = Validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  // Check if this user already exisits
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(400).send('That user already exisits!')
  } else {
    // Insert the new user if they do not exist yet
    user = new User({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password
    })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    res.send(user)
  }
})

// router.get('/api/users/all', async (req, res) => {
//   const { error } = Validate(req.body)
//   if (error) {
//     return res.status(404).send('something went wrong')
//   }
//   User.findOne({
//     _id: req.params.id,
//     function (error, res) {
//       if (error) {
//         res.send('Error occured')
//       } else {
//         res.json('res')
//       }
//     }
//   })
// })

router.get('/api/users/a', function(req,res) {

  User.find({},function(error,employee){
      if(error){
          res.send("error has occured");
      } else{
          res.send(employee);
      }
  })
})

module.exports = router
