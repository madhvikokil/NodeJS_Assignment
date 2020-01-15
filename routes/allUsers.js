// data fetching of all users
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const app = express()
const { User } = require('../model/user')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

router.get('/', async (req, res) => {
  User.find({}, function (error, employee) {
    if (error) {
      res.send('error has occured')
    } else {
      res.send(employee)
    }
  })
})

module.exports = router
