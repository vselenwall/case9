import express from 'express';
import postsController from '../controllers/controllerPosts.js';

const router = express.Router();

router.get('/', postsController.getPosts);
router.post('/', postsController.addPost);
router.delete('/:id', postsController.deletePost);
router.put('/:id', postsController.editPost);

export default router;