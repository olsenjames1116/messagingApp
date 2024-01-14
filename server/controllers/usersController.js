const User = require('../models/user');
const { body, validationResult, param } = require('express-validator');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require('../utils/redis');
const cloudinary = require('../utils/cloudinary');
const mongoose = require('mongoose');

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
				// If a user is found in the db, the username already exists.
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
			// If the passwords do not match, there is an error.
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
exports.userLogInPost =
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
			// There are no validation errors. Further check user credentials before logging in.
			const { username, password } = req.body;
			const user = await User.findOne({ username: username }).populate({
				path: 'friends',
				select: '_id username profilePic',
			});
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
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '30m' }
			);
			// Create a refresh token for the user.
			const refreshToken = jwt.sign(
				user.toJSON(),
				process.env.REFRESH_TOKEN_SECRET,
				{ expiresIn: '1h' }
			);

			// Store the tokens in Redis.
			await client.set('accessToken', accessToken);
			await client.set('refreshToken', refreshToken);

			// Return user info.
			res.status(200).json({
				username: user.username,
				profilePic: user.profilePic,
				_id: user._id,
				bio: user.bio,
				friends: user.friends,
			});
		}
	});

// Verify a user's access token.
exports.userVerifyTokenGet = asyncHandler(async (req, res, next) => {
	// Retrieve the access token from Redis.
	const accessToken = await client.get('accessToken');

	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		// The conditional below forbids access if the token is invalid.
		if (err) return res.status(403).send('Could not verify access token');

		// Reached if the access token is valid.
		req.user = user;
		next();
	});
});

// Verify a user's refresh token.
const verifyRefresh = (username, refreshToken) => {
	try {
		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		/* If the decoded user associated with the token is equal to the user passed along
		from the request, the token is validationResult. */
		return decoded.username === username;
	} catch (err) {
		// A catch all for errors to invalidate the refresh token.
		return false;
	}
};

// Assign new tokens to user if access token has expired.
exports.userRefreshTokensPost = asyncHandler(async (req, res, next) => {
	const { username } = req.body;
	const refreshToken = await client.get('refreshToken');

	const refreshIsValid = verifyRefresh(username, refreshToken);
	if (!refreshIsValid) {
		// The refresh token is invalid. Deny access.
		return res.status(403).send('Refresh token is not valid.');
	}

	const user = await User.findOne({ username: username });
	if (!user) {
		// The user with the given username does not exist. Deny access.
		return res.status(403).send('Could not find user with token.');
	}

	// Anything under here is reached with valid user information.

	// Create new tokens.
	const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '30m',
	});
	const newRefreshToken = jwt.sign(
		user.toJSON(),
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: '1h' }
	);

	// Store new tokens in Redis.
	await client.set('accessToken', accessToken);
	await client.set('refreshToken', newRefreshToken);

	res.status(200).send('Successfully refreshed tokens.');
});

// Removes a user's access on log out.
exports.userLogOutGet = asyncHandler(async (req, res, next) => {
	// Access is removed by deleting their tokens.
	await client.del('accessToken');
	await client.del('refreshToken');

	res.status(200).send('Successfully removed user access.');
});

// Validate and sanitize data from the request.
exports.validateUserUpdate = [
	body('bio').trim().escape(),
	body('profilePic').custom((profilePic) => {
		if (!profilePic.includes('image')) {
			// File must be of type image.
			throw new Error('File is not of type image.');
		} else {
			return true;
		}
	}),
];

// Update a user's stored information in the db.
exports.userProfilePut =
	// Process request after validation and sanitization.
	asyncHandler(async (req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			// There are errors. Render the form again with error message.
			const errorMessages = errors.array().map((error) => error.msg);

			return res.status(400).json({
				message: errorMessages,
			});
		} else {
			// There are no errors. Update the user's information.
			const { username } = req.user;
			const { bio, profilePic } = req.body;

			// Store the image in Cloudinary and retrieve the url.
			const { url } = await cloudinary.uploader.upload(profilePic, {
				upload_preset: 'messagingApp',
			});

			// Update the user information in the db with the reference to the image.
			await User.findOneAndUpdate(
				{ username: username },
				{ bio: bio, profilePic: url }
			);

			// Return the url to the new image to display the change on front end.
			res.status(202).json({ image: url });
		}
	});

// Validate and sanitize field to retrieve user.
exports.validateUserGet = [
	param('username', 'Enter a username.').trim().escape().notEmpty(),
];

// Search for a user in the db.
exports.userSearchGet = asyncHandler(async (req, res, next) => {
	// Extract the validation errors from the request.
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// There are errors. Render form again with error messages.s
		const errorMessages = errors.array().map((error) => error.msg);

		return res.status(400).json({
			message: errorMessages,
		});
	} else {
		// There are no validation errors.
		const { username } = req.params;

		const user = await User.findOne(
			{ username: username },
			'_id username profilePic'
		);
		if (!user) {
			// User does not exist in the database.
			return res.status(400).json({
				message: `No user with username "${username}" was found.`,
			});
		}

		res.status(200).json({
			user: user,
		});
	}
});

// Add a new friend to a user's account in the db.
exports.userAddFriendPost = asyncHandler(async (req, res, next) => {
	const { user } = req;
	const { id } = req.params;

	// Create a new Object Id object to store in db.
	const friendId = new mongoose.Types.ObjectId(id);

	// Update the friends of the user that sent the request.
	await User.findOneAndUpdate(
		{ _id: user._id },
		{ $push: { friends: friendId } }
	);

	// Update the friends of the user that received the request.
	await User.findOneAndUpdate(
		{ _id: friendId },
		{ $push: { friends: user._id } }
	);

	res.status(200).send(`Successfully user: ${id} to friends.`);
});
