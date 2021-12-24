import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
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
    }
}, {version:0})

mongoose.connect("mongodb://localhost:27017/forumAppDb");
const Post = mongoose.model("Post", postSchema);

export default Post;

