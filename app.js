const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
// const users = require('./routes/users')
// const login = require('./routes/loginUser')
const allRoutes = require('./routes/allRoutes')
// const token = require('./routes/token')

// const specificUser = require('./routes/specificUser')
const express = require('express')
const app = express()

mongoose.connect('mongodb://localhost/mongo-games')
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err))

app.use(express.json())

app.use('/', allRoutes)
// app.use('/api/auth', login)
// // app.use('/api/logout', logout)
// app.use('/users/list', allUsers)
// app.use('/users/post', token)
// app.use('/users', specificUser)

const port = process.env.PORT || 4001
app.listen(port, () => console.log(`Listening on port ${port}...`))
