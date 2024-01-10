const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: { type: String, required: true, maxLength: 100 },
	password: { type: String, required: true, maxLength: 100 },
	profilePic: {
		type: Schema.Types.ObjectId,
		ref: 'Image',
		required: true,
		default: '659f296a250f775b11a56227',
	},
	bio: { type: String, default: '' },
});

module.exports = mongoose.model('User', UserSchema);
