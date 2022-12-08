import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
    res.render("welcome");
});

// router.get("/register", (req, res) => {
//     res.render("register");
// });

// router.get("/login", (req,res) => {
//     res.render("login");
// });

// function checkAuth(req,res,next) {
//     if (req.session.checkUser) {
//         console.log("User is ok");
//         next();
//     } else {
//         console.log("User is not ok");
//         const q = (new URLSearchParams({type: "fail", message: "You must login to access content"})).toString();
//         res.redirect(`/register/login?${q}`)
//     }
// }

// router.use(checkAuth);

// router.get("/profile", (req, res) => {
//     res.render("profile");
// });

router.get("/post", (req, res) => {
    res.render("post");
});

export default router;