import profileController from '../controllers/controllerProfile.js'
import express from 'express';

const router = express.Router();

// router.get("/profile", (req, res) => {
//     res.render("profile");
// });

router.get('/', profileController.getUserPosts);

export default router;