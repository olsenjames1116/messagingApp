const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'client/src/assets/uploads/');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now();
		cb(null, `${uniqueSuffix}_${file.originalname}`);
	},
});

const upload = multer({ storage: storage });

// POST a new user when they sign up.
router.post(
	'/sign-up',
	usersController.validateUserSignUp,
	usersController.userSignUpPost
);

// POST a user's credentials when they log in.
router.post(
	'/log-in',
	usersController.validateUserLogIn,
	usersController.userLogInPost
);

// GET the path to verify a user's access token.
router.get('/verifyToken', usersController.userVerifyTokenGet);

// POST a user's info with new refresh and access tokens after they expire.
router.post('/refreshTokens', usersController.userRefreshTokensPost);

// GET the path to remove a user's access.
router.get('/log-out', usersController.userLogOutGet);

// PUT a user's updated info from their edits to their profile into the db.
router.put(
	'/update-info',
	usersController.userVerifyTokenGet,
	upload.single('profilePic'),
	// usersController.validateUserUpdate,
	usersController.userProfilePut
);

// GET information about a user to display on home page.
router.get('/get-info', usersController.userVerifyTokenGet);

module.exports = router;
