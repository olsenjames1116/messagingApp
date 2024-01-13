const mongoose = require('mongoose');

// Set up mongoose connection.
mongoose.set('strictQuery', false);

const mongoDB = process.env.PRODDB_URI || process.env.DEVDB_URI;
main().catch((err) => {
	console.log(err);
});
async function main() {
	await mongoose.connect(mongoDB);
}
