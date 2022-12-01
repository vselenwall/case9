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

router.get("/profile", (req, res) => {
    res.render("profile");
});

router.get("/post", (req, res) => {
    res.render("post");
});

export default router;