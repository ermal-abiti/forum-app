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
import { 
    getAllComments,
    addComment,
    deleteComment
} from "../controllers/CommentController.js";


const router = Router();

// Post Routes
router.get('/posts', getAllPosts);
router.post('/addpost', auth, addPost);
router.get('/post/', getPostById);
router.put('/post/:postid', updatePost);
router.delete('/post/:postid', deletePost);
router.get('/followingPosts', auth, getFollowingPosts);

// Comment Routes
router.get('/comments', getAllComments);
router.post('/comment', auth, addComment);
router.delete('/comment', auth, deleteComment);

export default router;