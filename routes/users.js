
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
      password: req.body.password,
      isAdmin: req.body.isAdmin
    })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    res.send(user)
  }
})


module.exports = router
