import UserController from '../controller/users'
const express = require('express')
const router = express.Router()

// DASHBOARD
router.get('/', UserController.showUserCondition)

// SEARCH BY ID
router.get('/users/:id', UserController.particularUser)

// UPDATE
router.put('/users/:id', UserController.updateUser)

router.get('/usersactivity', UserController.lastActive)

module.exports = router
