import { Router } from "express";
import auth from "../middleware/auth.js";
import {
    getAllPosts,
    getPostById,
    updatePost,
    addPost,
    deletePost,
    getFollowingPosts
} from "../controllers/PostController.js";

const router = Router();

// Post Routes
router.get('/posts', getAllPosts);
router.post('/addpost', auth, addPost);
router.get('/post/:postid', getPostById);
router.put('/post/:postid', updatePost);
router.delete('/post/:postid', deletePost);
router.get('/followingPosts', auth, getFollowingPosts);

export default router;