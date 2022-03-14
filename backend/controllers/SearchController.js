import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

export const searchAny = async (req, res) => {
    try {
        if (!req.query.text) {
            throw new Error('');
        }
        const text = req.query.text;

        let users = await User.find({ username: { $regex: text } });
        let posts = await Post.find({ content: { $regex: text } });
        let comments = await Comment.find({ content: { $regex: text } });

        for (let i = 0; i < posts.length; i++) {
            posts[i].creator = await User.findById(posts[i].creator);
        }

        for (let i = 0; i < comments.length; i++) {
            comments[i].creator = await User.findById(comments[i].creator);
        }

        res.json({
            users,
            posts,
            comments,
        });
    } catch (err) {
        res.json({ message: err.message });
    }
};
