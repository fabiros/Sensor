import { Schema, model } from 'mongoose';
import { hashPassword } from '../services';

const UserSchema = new Schema({
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
        Default: 0,
    },
    email: {
        type: String,
        unique: true,
    },
});

UserSchema.method('findByName', (name, cb) => {
    return this.findOne(
        {
            username: name,
        },
        (err, user) => {
            return cb(err, user);
        }
    );
});

// register the user, do nothing if the user exists
UserSchema.statics('register', (username, password, email, cb) => {
    this.findByName(username, (err, user) => {
        if (err) {
            cb(err, null);
        }

        if (user == null) {
            const newUser = new UserSchema();
            newUser.username = username;
            newUser.email = email;

            // newUser.password = password;
            newUser.createDate = new Date();

            // hash the password
            hashPassword(password, (error, hash) => {
                if (error) {
                    return cb(error, null);
                }
                newUser.password = hash;
                newUser.save((e, usr) => {
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
});

export default model('User', UserSchema);
