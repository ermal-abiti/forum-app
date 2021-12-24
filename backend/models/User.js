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
    ]
}, {version: 0})

mongoose.connect("mongodb://localhost:27017/forumAppDb");
const User = mongoose.model("User", userSchema);

export default User;

