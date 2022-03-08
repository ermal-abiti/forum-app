import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    dateCreated: {
        type: Date,
        required: true,
        select: false
    },
    token: {
        type: String,
        select: false
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Post',
            select: false
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
            select: false
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
            select:false
        }
    ],
    role: {
            type: String, 
            required: true
    }
}, {version: 0})

mongoose.connect(process.env.MONGO_URI);
const User = mongoose.model("User", userSchema);

export default User;

