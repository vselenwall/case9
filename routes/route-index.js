import express from 'express';
import postsController from '../controllers/controllerPosts.js';

const router = express.Router();

router.get('/', postsController.getPosts);
// router.post('/posts', postsController.addPost);

export default router;