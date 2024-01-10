const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
	data: { type: String, required: true },
});

module.exports = mongoose.model('Image', ImageSchema);
