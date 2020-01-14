import createError from 'http-errors'
import express from 'express'
import session from 'express-session'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import bodyParser from 'body-parser'
import sess from 'express-session'
import passport from 'passport'
import localStrategy from 'passport-local'
import multer from 'multer'
import flash from 'connect-flash'
import mongo from 'mongo'
import mongoose from 'mongoose'
import indexRouter from './routes/index'
import usersRouter from './routes/users'
let db = mongoose.connetion

// routes
let routes = require('./routes/index')
let user = require('./routes/users')

// init app
let app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// handle file uploads
// app.use(multer({dest: './uploads'}))

// bodyparser middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//
app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
