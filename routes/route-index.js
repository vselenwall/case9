import express from 'express';
import postsController from '../controllers/controllerPosts.js';

const router = express.Router();

function checkAuth(req,res,next) {
    if (req.session.checkUser) {
        console.log("User is ok");
        next();
    } else {
        console.log("User is not ok");
        const q = (new URLSearchParams({type: "fail", message: "You must login to access content"})).toString();
        res.redirect(`/register/login?${q}`)
    }
}

router.use(checkAuth);

router.get('/', postsController.getPosts);
router.post('/', postsController.addPost);
router.delete('/:id', postsController.deletePost);
router.put('/:id', postsController.editPost);

export default router;