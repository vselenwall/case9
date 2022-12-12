import profileController from '../controllers/controllerProfile.js'
import express from 'express';
import postsController from '../controllers/controllerPosts.js'
// import userController from '../controllers/userController.js';

const router = express.Router();

// router.get("/profile", (req, res) => {
//     res.render("profile");
// });

router.get('/', profileController.getUserPosts);
router.put('/:id', postsController.editPost);
router.delete('/:id', postsController.deletePost);

// router.post("/login", userController.loginUser);

export default router;