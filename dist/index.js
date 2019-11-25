'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Needed for reading from .env
require('dotenv').config(); /* Server */


var app = (0, _express2.default)();

// Connect to MongoDB
/* mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); // Connect to database
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database')) */

// Define what app needs to use
app.use(_express2.default.json()); // Accept json


// Define routes
app.use('/api', _routes2.default);

// Start app
app.listen(3000, function () {
  return console.log('server started');
});