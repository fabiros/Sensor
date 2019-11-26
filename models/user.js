import { Schema, model } from 'mongoose';

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

export default model('User', UserSchema);
