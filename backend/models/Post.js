import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        dateCreated: {
            type: Date,
            required: true,
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
    },
    { version: 0 },
);

mongoose.connect(process.env.MONGO_URI);
const Post = mongoose.model('Post', postSchema);

export default Post;
