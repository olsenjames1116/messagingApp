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
			const { user } = req;

			const newMessage = new Message({
				to: to,
				from: from,
				message: message,
				timestamp: Date.now(),
			});

			const { _id } = await newMessage.save();

			await User.findOneAndUpdate({ _id: to }, { $push: { messages: _id } });

			user.messages.push(_id);
			await User.findOneAndUpdate({ _id: from }, { $push: { messages: _id } });

			res
				.status(200)
				.send(`Successfully sent: ${message} to: ${to} from: ${from}`);
		}
	});