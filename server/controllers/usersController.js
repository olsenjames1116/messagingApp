const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// Validate and sanitize fields to create user on sign up.
exports.validateUserSignUp = [
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

// Store a user in the database.
const storeUser = (user) => {
	// Hash the user's password for security.
	bcrypt.hash(user.password, 10, async (err, hashedPassword) => {
		if (err) {
			return next(err);
		} else {
			user.password = hashedPassword;
			await user.save();
		}
	});
};

// Creates a user to be stored in the db.
exports.userCreatePost =
	// Process request after validation and sanitization.
	asyncHandler(async (req, res, next) => {
		// Extract the validation errors from the request.
		const errors = validationResult(req);

		// Create a User object with escaped and trimmed data.
		const { username, password } = req.body;
		const user = new User({
			username: username,
			password: password,
		});

		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/error messages.
			const errorMessages = errors.array().map((error) => error.msg);

			return res.status(400).json({
				message: errorMessages,
			});
		} else {
			// There are no errors. Store the user in the database and return a success message.
			storeUser(user);
			res.status(201).json({
				message:
					'Your account has been created. You will be redirected to log in.',
			});
		}
	});

// Validate and sanitize data from user on log in.
exports.validateUserLogIn = [
	body('username')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Username must not be empty.')
		.custom(async (username) => {
			const user = await User.findOne({ username: username });
			if (!user) {
				throw new Error('Username does not exist.');
			}
		}),
	body('password')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Password must not be empty.'),
];
