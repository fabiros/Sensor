'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var UserSchema = new _mongoose.Schema({
    firstName: String,
    lastName: String,
    fullName: String,
    username: String,
    createdBy: String,
    createDate: Date
});

exports.default = (0, _mongoose.model)('User', UserSchema);