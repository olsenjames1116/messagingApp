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

// GET all the messages between the user and the specified one.
router.get(
	'/:id',
	usersController.userVerifyTokenGet,
	messagesController.messagesGet
);

module.exports = router;
