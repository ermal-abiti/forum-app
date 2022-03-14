import Post from '../models/Post.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import { ObjectId } from 'mongodb';

export async function getAllPosts(req, res) {
    try {
        const result = await Post.find({}).sort({ dateCreated: -1 });
        for (let i = 0; i < result.length; i++) {
            result[i].creator = await User.findOne({ _id: result[i].creator });
            result[i].comments = await Comment.find({ post: ObjectId(result[i]._id) });
        }

        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

export async function getPostById(req, res) {
    try {
        const post = await Post.findOne({ _id: ObjectId(req.query.postid) });
        const creator = await User.findById(post.creator);
        const comments = await Comment.find({ post: ObjectId(req.query.postid) });

        for (let i = 0; i < comments.length; i++) {
            comments[i].creator = await User.findById(comments[i].creator);
        }

        post.comments = comments;
        post.creator = creator;

        return res.status(200).json(post);
    } catch (err) {
        console.log(err);
    }
}

export async function addPost(req, res) {
    const data = req.body;

    data.dateCreated = new Date().toISOString();

    data.creator = await User.findOne({ _id: req.user.user_id });
    
    data.image_url = null;
    
    if(req.file) {
        data.image_url = req.file.filename;
    }

    const newPost = new Post(data);

    const error = newPost.validateSync();

    if (!error) {
        newPost.save();
        return res.status(200).json(newPost);
    }
    res.json('Post was not created, check all the fields...');
}

export async function updatePost(req, res) {
    try {
        const updateResult = await Post.updateOne({ _id: ObjectId(req.params.postid) }, req.body);
        console.log(updateResult);
        return res.send('Post updated successfully!');
    } catch (err) {
        console.log(err);
    }
}

export async function deletePost(req, res) {
    try {
        const post = await Post.findOne({ _id: req.params.postid });

        if (!post) {
            throw new Error('No post found with that id');
        }

        //* check if the user logged in has the same id of the user who created the post
        if (post.creator.toString() === req.user.user_id.toString()) {
            post.remove();

            //cascade comments
            await Comment.deleteMany({ post: post._id });

            res.json('Post deleted successfully!');
        } else {
            throw new Error('You are not the creator of the post. You cannot delete this post');
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

export async function getFollowingPosts(req, res) {
    try {
        const user = await User.findOne({ _id: req.user.user_id });
        const followingUsers = [];

        for (let i = 0; i < user.following.length; i++) {
            followingUsers.push(user.following[i]);
        }

        const posts = await Post.find({
            creator: { $in: followingUsers },
        }).sort({ dateCreated: -1 });

        for (let i = 0; i < posts.length; i++) {
            const creator = await User.findOne({ _id: posts[i].creator });
            const comments = await Comment.find({ post: posts[i]._id });
            posts[i].creator = creator;
            posts[i].comments = posts[i].comments.concat(comments);
        }

        return res.status(200).json(posts);
    } catch (err) {
        return res.json({ error: err.message });
    }
}
