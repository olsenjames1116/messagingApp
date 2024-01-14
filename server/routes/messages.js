const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');
const usersController = require('../controllers/usersController');

// POST a message sent from a user.
router.post(
	'/send-message',
	usersController.userVerifyTokenGet,
	messagesController.validateMessagePost,
	messagesController.messagePost
);

module.exports = router;
