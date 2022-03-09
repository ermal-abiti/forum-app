import Post from '../models/Post.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import { ObjectId } from 'mongodb';

export const getAllComments = async (req, res, next) => {
    try {
        const result = await Comment.find({});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const addComment = async (req, res, next) => {
    try {
        if (!req.query.postid) {
            throw new Error('Post with the given id does not exists');
        }

        const data = req.body;

        data.dateCreated = new Date().toISOString();

        data.creator = await User.findOne({ _id: req.user.user_id });
        data.post = await Post.findOne({ _id: req.query.postid });

        if (!data.post) {
            throw new Error('Post with the given id does not exists');
        }

        const newComment = new Comment(data);

        const error = newComment.validateSync();

        if (!error) {
            newComment.save();
            return res.status(200).json(newComment);
        }
        res.json('Post was not created, check all the fields...');
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.user_id });
        const comment = await Comment.findOne({ _id: req.query.commentid });
        if (!comment) {
            throw new Error('Comment does not exist!');
        }

        if (comment.creator.toString() === user._id.toString()) {
            comment.remove();
            return res.json('Deleted successfully comment');
        } else {
            throw new Error('You cannot delete that comment!');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
