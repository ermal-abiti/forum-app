import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import { ObjectId } from "mongodb";

export const getAllComments = async (req, res, next) => {
    try {
        const result = await Comment.find({});
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const addComment = async (req, res, next) => {
    try {
        const data = req.body;

        data.dateCreated = new Date().toISOString();
        // const userId = req.cookies['userid'] || req.headers['userid'];

        data.creator = await User.findOne({username: 'ermalabiti'});
        data.post = await Post.findOne({_id: '61fcf7e04105275b5f5f0ed1'});
        const newComment = new Comment(data);

        const error = newComment.validateSync();

        if (!error) {
            newComment.save();
            return res.status(200).json(newComment);
        }
        res.json("Post was not created, check all the fields...")

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}