import mongoose, {Schema} from "mongoose";


const userModelSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'email is required'],
    },

    password: {
        type: String,
        rqeuired: [true, 'password is required'],
    },

    roles: {
        type: [String],
        default: ['USER'],
        enum: ['ADMIN', 'USER', 'DEVELOPER'],
    },

    verify: {
        type: Boolean,
        default: false,
    },

    date: {
        type: Date,
        default: Date.now(),
    },

    banned: {
        type: Boolean,
        default: false,
    },
});


export const UserModel = mongoose.model('User', userModelSchema);