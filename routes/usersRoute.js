import express from 'express';
import Controller from '../controller/user';
import CheckValidations from '../middleware/validation';
import TokenVerification from '../middleware/tokenVerification';

const router = express.Router();

// SIGNUP
router.post('/signup', CheckValidations.validateRegister, Controller.signup);

// LOGIN
router.post('/login', CheckValidations.validateLogin, Controller.login);

// DASHBOARD
router.get('/dashboard', TokenVerification.tokenCheck, Controller.showUserCondition);

// SEARCH BY ID
router.get('/dashboard/users/:id', TokenVerification.tokenCheck, Controller.particularUser);

// UPDATE
router.put('/dashboard/users/:id', TokenVerification.tokenCheck, Controller.updateUser);

// Check 5 days data
router.get('/dashboard/usersactivity', TokenVerification.tokenCheck, Controller.lastActive);

module.exports = router;
