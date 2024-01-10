const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.validateUserCreate = [
	body('username')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Username must not be empty.'),
];
