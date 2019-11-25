import {
    Schema,
    model
} from 'mongoose'


const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    fullName: String,
    username: String,
    createdBy: String,
    createDate: Date,
})

export default model('User', UserSchema)