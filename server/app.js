require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./utils/mongodb');
const cors = require('cors');

const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');

const app = express();

// Middleware for all requests.
app.use(cors());
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
