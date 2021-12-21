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
    userId: {
        type: String,
        required: true
    }
})

mongoose.connect("mongodb://localhost:27017/forumAppDb");
const Post = mongoose.model("Post", postSchema);

export default Post;

