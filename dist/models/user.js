'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _services = require('../services');

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

// register the user, do nothing if the user exists
UserSchema.statics.register = function (username, password, email, cb) {
    undefined.findByName(username, function (err, user) {
        if (err) {
            cb(err, null);
        }

        if (user == null) {
            var newUser = new UserSchema();
            newUser.username = username;
            newUser.email = email;

            // newUser.password = password;
            newUser.createDate = new Date();

            // hash the password
            (0, _services.hashPassword)(password, function (error, hash) {
                if (error) {
                    return cb(error, null);
                }
                newUser.password = hash;
                newUser.save(function (e, usr) {
                    if (e) {
                        // check duplicate key violation, username and email must be unique
                        if (e.code === 11000) {
                            return cb(null, usr);
                        }
                        return cb(e, null);
                    }
                    return cb(null, usr);
                });
            });
        } else {
            return cb(null, user);
        }
    });
};

exports.default = (0, _mongoose.model)('User', UserSchema);