const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

// POST a new user when they sign up.
router.post(
	'/sign-up',
	usersController.validateUserSignUp,
	usersController.userCreatePost
);

// POST a user's credentials when they log in.
router.post('/log-in', usersController.validateUserLogIn);

module.exports = router;
