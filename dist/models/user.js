'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var UserSchema = new _mongoose.Schema({
    firstName: String,
    lastName: String,
    displayName: String,
    username: String,
    password: String,
    createdBy: String,
    createDate: Date,
    lastLogin: Date,
    loginCount: {
        type: Number,
        Default: 0
    },
    email: {
        type: String,
        unique: true
    }
});

UserSchema.method('findByName', function (name, cb) {
    return undefined.findOne({
        username: name
    }, function (err, user) {
        return cb(err, user);
    });
});

exports.default = (0, _mongoose.model)('User', UserSchema);