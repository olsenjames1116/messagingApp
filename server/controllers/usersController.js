const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redis = require('redis');

if (process.env.MODE === 'production') {
} else {
	const client = redis.createClient();
}

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
exports.userSignUpPost =
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
			// There are errors. Render form again with error messages.
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
	body('username', 'Username must not be empty.').trim().escape().notEmpty(),
	body('password', 'Password must not be empty.').trim().escape().notEmpty(),
];

// Checks input credentials against stored credentials to log user in.
exports.userLogInPost = asyncHandler(async (req, res, next) => {
	// Extract the validation errors from the request.
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// There are errors. Render form again with error messages.
		const errorMessages = errors.array().map((error) => error.msg);

		return res.status(400).json({
			message: errorMessages,
		});
	} else {
		// There are no validation errors. Further check user credentials before logging in.
		const { username, password } = req.body;
		const user = await User.findOne({ username: username });
		if (!user) {
			// User does not exist in database.
			return res.status(401).json({
				message: 'Username does not exist.',
			});
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			// Input password and stored password does not match.
			return res.status(401).json({
				message: 'Invalid password.',
			});
		}

		// Anything below here is reached from a successful log in.

		// Create an access token for the user.
		const accessToken = jwt.sign(
			user.toJSON(),
			process.env.ACCESS_TOKEN_SECRET
		);
		// Create a refresh token for the user.
		const refreshToken = jwt.sign(
			user.toJSON(),
			process.env.REFRESH_TOKEN_SECRET
		);

		// Store the tokens in Redis.
		await client.set('accessToken', accessToken);
		await client.set('refreshToken', refreshToken);

		res.sendStatus(200);
	}
});
