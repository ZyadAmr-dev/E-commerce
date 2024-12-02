import express from "express";
import { validUser } from "../../middlewares/authMiddleware";
import authController from "../../controllers/authController";

const router = express.Router();

router.post('/register', validUser, authController.register);

export default router;
