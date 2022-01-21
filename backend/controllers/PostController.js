import Post from "../models/Post.js";
import User from "../models/User.js";
import { ObjectId } from "mongodb";

export async function getAllPosts (req, res) {
    try {
        const result = await Post.find({}).sort({"dateCreated": -1});
        for (let i =0; i<result.length; i++){
            result[i].creator = await User.findOne({_id: result[i].creator})
        }
        return res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
    }
}

export async function getPostById (req, res) {
    try {
        const result = await Post.findOne({ _id: ObjectId(req.params.postid)});
        return res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
    }
    
}

export async function addPost (req, res) {
    
    const data = req.body;

    data.dateCreated = new Date().toISOString();
    const userId = req.cookies['userid'] || req.headers['userid'];
    // const creator = await User.findOne({_id: userId});
    // console.log(creator);
    data.creator = await User.findOne({_id: userId});

    const newPost = new Post(data);

    const error = newPost.validateSync();

    if (!error) {
        newPost.save();
        return res.status(200).json(newPost);
    }
    res.json("Post was not created, check all the fields...")

}

export async function updatePost (req, res) {
    try {
        const updateResult = await Post.updateOne({_id: ObjectId(req.params.postid)}, req.body);
        console.log(updateResult);
        return res.send("Post updated successfully!");
    }
    catch (err) {
        console.log(err);
    }
}

export async function deletePost (req, res) {
    try {
        const deleteResult = await Post.deleteOne({_id: ObjectId(req.params.postid)});
        console.log(deleteResult);
        return res.send("Post deleted successfully");
    } catch (err) {
        console.log(err);
    }
}

export async function getFollowingPosts (req, res) {
    try {
        const user = await User.findOne({_id: req.user.user_id});
        const result = await Post.find({}).sort({"dateCreated": -1});
        let newResult = [];
        
        for (let i =0; i<result.length; i++){
            for (let j =0; j<user.following.length; i++){
                console.log(result[i]);
                console.log(following[j]);
            }
            // if (result[i].creator == user._id) {
            //     result[i].creator = await User.findOne({_id: result[i].creator})
            //     newResult.push(result[i]);
            // }
        }
        return res.status(200).json(newResult);
    } catch (err) {
        return err.message;
    }
}