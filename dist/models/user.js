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

/* // register the user, do nothing if the user exists
UserSchema.statics.register = function(username, password, email, ldap, cb) {
    this.findByName(username, function(err, user) {
        if (err) return next(err);

        if (user == null) {
            logger.debug(
                'Try to register user ' + username + ' using ldap: ' + ldap
            );
            user = new User();
            user.ldap = ldap;
            user.username = username;
            user.email = email;
            user.createDate = new Date();

            // for ldap users generate a random password
            var pw = password || generatePassword(12, true);

            // hash the password
            hashPassword(pw, function(err, hash) {
                user.password = hash;
                user.save(function(err, user) {
                    if (err) {
                        // check duplicate key violation, username and email must be unique
                        if (err.code == 11000) {
                            return cb(null, user);
                        } else {
                            return cb(err, null);
                        }
                    }
                    return cb(null, user);
                });
            });
        } else return cb(null, user);
    });
}; */

exports.default = (0, _mongoose.model)('User', UserSchema);