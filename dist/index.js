'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _lib = require('./lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import mongoose from 'mongoose';

// Needed for reading from .env
/* Server */
require('dotenv').config();

var app = (0, _express2.default)();

// Connect to MongoDB
/* mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); // Connect to database
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database')) */

// Define what app needs to use
app.use(_bodyParser2.default.json()); // Accept json
app.use(_bodyParser2.default.urlencoded({
    // Parse URL-encoded bodies
    extended: true
}));

// Define routes
app.use('/api/users', _routes2.default);

// Start app
app.listen(3000, function () {
    return _lib2.default.info('server started');
});