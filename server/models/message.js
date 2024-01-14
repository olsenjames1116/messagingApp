const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	message: { type: String, required: true },
	timestamp: { type: Date, required: true },
});

module.exports = mongoose.model('Message', MessageSchema);
