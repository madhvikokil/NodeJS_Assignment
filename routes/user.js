import UserController from '../controller/users'
const express = require('express')
const router = express.Router()

// DASHBOARD
router.get('/', UserController.show_user_condition)

// SEARCH BY ID
router.get('/users/:id', UserController.particular_user)

// UPDATE
router.put('/users/:id', UserController.update_user)

module.exports = router
