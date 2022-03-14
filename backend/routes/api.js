import { Router } from 'express';
import auth from '../middleware/auth.js';
import { getAllPosts, getPostById, updatePost, addPost, deletePost, getFollowingPosts } from '../controllers/PostController.js';
import { getAllComments, addComment, deleteComment } from '../controllers/CommentController.js';
import { searchAny } from '../controllers/SearchController.js';
import multer from 'multer';
import path from 'path';

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    },
});

const upload = multer({ storage: fileStorageEngine });

const router = Router();

router.get('/fetchImage/:file(*)', (req, res) => {
    let file = req.params.file;
    let fileLocation = path.join('./images/');
    res.sendFile(`${file}`, { root: fileLocation });
});

// Post Routes
router.get('/posts', getAllPosts);
router.post('/addpost', auth, upload.single('image'), addPost);
router.get('/post/', getPostById);
router.put('/post/:postid', auth, updatePost);
router.delete('/post/:postid', auth, deletePost);
router.get('/followingPosts', auth, getFollowingPosts);

// Comment Routes
router.get('/comments', getAllComments);
router.post('/comment', auth, addComment);
router.delete('/comment', auth, deleteComment);

// Search routes
router.get('/search', searchAny);

export default router;
