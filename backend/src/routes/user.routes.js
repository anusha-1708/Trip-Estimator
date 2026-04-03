import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUsersController } from "../controllers/user.controller.js";

const router = express.Router();
router.get("/", authMiddleware, getUsersController);

export default router;
