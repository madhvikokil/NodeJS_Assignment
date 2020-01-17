import express from 'express'
import AuthController from '../controller/auth'
const router = express.Router()

// SIGNUP
router.post('/signup', AuthController.signup)

// LOGIN
router.post('/login', AuthController.login)

module.exports = router
