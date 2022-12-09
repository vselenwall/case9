import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// User router
router.get("/", (req, res) => {
    res.render("register");
    console.log("Du har kommit in på rätt sida");
});

router.post("/", userController.registerUser);
// router.post("/", userController.loginUser);

router.get("/login", (req, res) => {
    res.render("login");
});


router.post("/login", userController.loginUser);

// router.get("/index", (req, res) => {
//     res.render("index");
// });

export default router;