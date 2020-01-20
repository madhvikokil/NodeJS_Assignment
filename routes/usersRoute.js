import express from 'express';
import AuthController from '../controller/user';
const router = express.Router();

// SIGNUP
router.post('/signup', AuthController.signup);

// LOGIN
router.post('/login', AuthController.login);

// DASHBOARD
router.get('/dashboard', AuthController.showUserCondition);

// SEARCH BY ID
router.get('/dashboard/users/:id', AuthController.particularUser);

// UPDATE
router.put('/dashboard/users/:id', AuthController.updateUser);

// Check 5 days data
router.get('/dashboard/usersactivity', AuthController.lastActive);

module.exports = router;
