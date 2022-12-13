import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// ROUTES: Register - login - logout

router.get("/", userController.getRegister);

router.post("/", userController.registerUser);
router.get("/login", userController.getLogin);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logOutUser);

export default router;