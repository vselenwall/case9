import profileController from '../controllers/controllerProfile.js'
import express from 'express';
import postsController from '../controllers/controllerPosts.js'
// import userController from '../controllers/userController.js';

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

// router.get("/profile", (req, res) => {
//     res.render("profile");
// });

router.get('/', profileController.getUserPosts);
router.put('/:id', postsController.editPost);
router.delete('/:id', postsController.deletePost);

// router.post("/login", userController.loginUser);

export default router;