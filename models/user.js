import { Schema,model } from 'mongoose'

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    displayName: String,
    username: String,
    createdBy: String,
    createDate: Date,
})

UserSchema.method('findByName', (name, cb) => {
    return this.findOne({
        username: name
    }, (err, user) => {
        return cb(err, user)
    })
})

export default model('User', UserSchema)