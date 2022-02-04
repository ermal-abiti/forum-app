import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Post'
    },
}, {version:0})

mongoose.connect(process.env.MONGO_URI);
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;

