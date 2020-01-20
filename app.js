
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import auth from './routes/auth'
import user from './routes/user'
import express from 'express'
const app = express()
dotenv.config({ path: './.env' })

mongoose.connect('mongodb://localhost/usersInfo')
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err))

app.use(express.json())

app.use('/', auth)
app.use('/dashboard', user)
const port = process.env.PORT || 4001
app.listen(port, () => console.log(`Listening on port ${port}...`))
