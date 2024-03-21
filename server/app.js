require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./utils/mongodb');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { rateLimit } = require('express-rate-limit');

const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');

const app = express();
app.set('trust proxy', 1);

// Apply rate limit to all requests.
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 20,
});

// Middleware for all requests.
app.use(limiter);
app.use(helmet());
app.use(compression());
app.use(
	cors({
		origin: [`${process.env.FRONT_URL}`, 'http://localhost:5173'],
	})
);
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes to controllers.
app.use('/api/user', usersRouter);
app.use('/api/message', messagesRouter);

// Catch 404 and forward to error handler.
app.use(function (req, res, next) {
	next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
	// Set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// Render the error page
	res.status(err.status || 500);
});

module.exports = app;
