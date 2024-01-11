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

// GET the path to verify a user's access token.
router.get('/verifyToken', usersController.userVerifyTokenGet);

// POST a user's info with new refresh and access tokens after they expire.
router.post('/refreshTokens', usersController.userRefreshTokensPost);

// GET the path to remove a user's access.
router.get('/log-out', usersController.userLogOutGet);

module.exports = router;
