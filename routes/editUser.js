const express = require('express')
const router = express.Router()
const { User } = require('../model/user')

router.put('/:id', (req, res) => {
  try {
    const post = User.findByIdAndUpdate({
      _id: req.params.id
    }, req.body)
    res.end(post)
  } catch (error) {
    res.send('error')
  }
})
//   User.findByIdAndUpdate({
//     _id: req.params.id
//   },
//   {
// $set:
//        {
//          name: req.body.name,
//          //    lastname: req.body.lastname,
//          //    email: req.body.email,
//          //    password: req.body.password,
//          upsert: true
//        },
// function (error, newEmployee) {
//   if (error) {
//     console.log('error ocured')
//   } else {
//     console.log(newEmployee)
//     res.status(204)
//   }
// }
//   })
// })

module.exports = router
