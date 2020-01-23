import express from 'express';
import Controller from '../controller/user';
import CheckValidations from '../middleware/validation';
const router = express.Router();

// SIGNUP
router.post('/signup', CheckValidations.validateRegister, Controller.signup);

// LOGIN
router.post('/login', CheckValidations.validateLogin, Controller.login);

// DASHBOARD
router.get('/dashboard', Controller.showUserCondition);

// SEARCH BY ID
router.get('/dashboard/users/:id', Controller.particularUser);

// UPDATE
router.put('/dashboard/users/:id', Controller.updateUser);

// Check 5 days data
router.get('/dashboard/usersactivity', Controller.lastActive);

module.exports = router;
