const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: { type: String, required: true, maxLength: 100 },
	password: { type: String, required: true, maxLength: 100 },
	profilePic: {
		type: Schema.Types.ObjectId,
		ref: 'Image',
		required: true,
		default: '65a191ff334a868a73ea0532',
	},
	bio: { type: String, default: '' },
	friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('User', UserSchema);
