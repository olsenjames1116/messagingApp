const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

// Validate and sanitize fields to create user.
exports.validateUserCreate = [
	body('username')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Username must not be empty.')
		.custom(async (username) => {
			const user = await User.findOne({ username: username });
			if (user) {
				throw new Error('Username is already in use.');
			}
		}),
	body('password', 'Password must not be empty.').trim().escape().notEmpty(),
	body('confirmPassword')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Confirmation must not be empty.')
		.custom((confirmPassword, { req }) => {
			return confirmPassword === req.body.password;
		})
		.withMessage('Passwords must match.'),
];
