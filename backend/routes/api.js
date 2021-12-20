import { Router } from "express";
import {
    getAllPosts,
    getPostById,
    updatePost,
    addPost,
    deletePost
} from "../controllers/PostController.js";

const router = Router();

// Post Routes
router.get('/posts', getAllPosts);
router.post('/addpost', addPost);
router.get('/post/:postid', getPostById);
router.put('/post/:postid', updatePost);
router.delete('/post/:postid', deletePost);
export default router;