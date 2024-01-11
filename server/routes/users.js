const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

// POST a new user when they sign up.
router.post(
	'/sign-up',
	usersController.validateUserSignUp,
	usersController.userSignUpPost
);

// POST a user's credentials when they log in.
router.post(
	'/log-in',
	usersController.validateUserLogIn,
	usersController.userLogInPost
);

module.exports = router;
