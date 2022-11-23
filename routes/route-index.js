import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
    res.render("../public/views/index");
});

export default router;