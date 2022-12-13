import profileController from '../controllers/controllerProfile.js'
import express from 'express';
import postsController from '../controllers/controllerPosts.js'

const router = express.Router();

// ROUTES: profile - get userposts - edit - delete

// check if user is auth to get profile posts and functions

function checkAuth(req, res, next) {
    if (req.session.checkUser) {
        console.log("User is ok");
        next();
    } else {
        console.log("User is not ok");
        const q = (new URLSearchParams({
            type: "fail",
            message: "You must login to access content"
        })).toString();
        res.redirect(`/register/login?${q}`)
    }
}

router.use(checkAuth);
router.get('/', profileController.getUserPosts);
router.put('/:id', postsController.editPost);
router.delete('/:id', postsController.deletePost);

export default router;