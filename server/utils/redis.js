const redis = require('redis');

// Set up connection to Redis.
let client;

// This conditional allows for connection to a production build of Redis.
if (process.env.MODE === 'production') {
	client = redis.createClient({ url: process.env.REDIS_URL });
} else {
	// Reached if the build is still in development.
	client = redis.createClient();
}
// Display meaningful messages to the console and connect to Redis.
client
	.on('connect', function () {
		console.log('Connected to Redis');
	})
	.on('error', (err) => console.log('Redis Client Error', err))
	.connect();

module.exports = client;
