import express from 'express';

const router = express.Router();

// ROUTES: welcome - post

router.get("/", (req, res) => {
    res.render("welcome");
});

router.get("/post", (req, res) => {
    res.render("post");
});

export default router;