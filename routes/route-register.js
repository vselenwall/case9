import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
    res.render("../public/views/register");
});

export default router;