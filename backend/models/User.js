import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true
    },
    token: {
        type: String,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Post'
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
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

