const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: { type: String, required: true, maxLength: 100 },
	password: { type: String, required: true, maxLength: 100 },
	profilePic: {
		type: String,
		required: true,
		default:
			'https://res.cloudinary.com/dszhwrjnv/image/upload/v1705107452/messagingApp/user_enybjy.png',
	},
	bio: { type: String, default: '' },
	friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('User', UserSchema);
