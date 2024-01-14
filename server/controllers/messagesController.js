const Message = require('../models/message');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

// Validate and sanitize fields to create a new message.
exports.validateMessagePost = [
	body('message', 'Cannot send an empty message.').trim().escape().notEmpty(),
];

// Create a new message to store in the db.
exports.messagePost =
	// Process request after validation and sanitization.
	asyncHandler(async (req, res, next) => {
		// Extract the validation errors from the request.
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			// There are errors. Render form again with error messages.
			const errorMessages = errors.array().map((error) => error.msg);

			return res.status(400).json({
				message: errorMessages,
			});
		} else {
			// There are no errors. Store the message in the db and update user messages.
			const { to, from, message } = req.body;

			// Create and store a new message in the db.
			const newMessage = new Message({
				to: to,
				from: from,
				message: message,
				timestamp: Date.now(),
			});

			// Retrieve the Object Id from the new message.
			const { _id } = await newMessage.save();

			// Update the messages for the user sending the message.
			await User.findOneAndUpdate({ _id: from }, { $push: { messages: _id } });

			// Update the messages for the user receiving the message.
			await User.findOneAndUpdate({ _id: to }, { $push: { messages: _id } });

			res
				.status(200)
				.send(`Successfully sent: ${message} to: ${to} from: ${from}`);
		}
	});

// Retrieve all the messages between the user and the specified one fron the db.
exports.messagesGet = asyncHandler(async (req, res, next) => {
	const { user } = req;
	const { id } = req.params;

	// Get all the messages that are sent and received from the currently selected friend.
	const messagesBetweenUsers = user.messages.filter(
		(message) => message.to == id || message.from === id
	);

	// Sort all messages between users by timestamp with oldest first.
	const sortedMessages = messagesBetweenUsers.sort(
		(a, b) => a.timestamp - b.timestamp
	);

	res.status(200).json({
		messages: sortedMessages,
	});
});
