const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

// POST a new user when they sign up.
router.post(
	'/sign-up',
	usersController.validateUserCreate,
	usersController.userCreatePost
);

module.exports = router;
