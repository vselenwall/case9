import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// User router
router.get("/", (req, res) => {
    res.render("register");
    console.log("Du har kommit in på rätt sida");
});

router.post("/", userController.registerUser);

router.post("/login", (req, res) => {
    res.render("login");
    console.log("Hejhej");
});

export default router;