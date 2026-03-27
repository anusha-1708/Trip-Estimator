import express from "express";
import {
  signupUserController,
  loginUserController,
} from "../controllers/auth.controller.js";
import upload, {
  authValidationMiddleware,
  authMiddleware,
} from "../middleware/auth.middleware.js";
import {
  signupSchemaValidation,
  loginSchemaValidation,
} from "../validation/auth.validation.js";
const router = express.Router();

router.post(
  "/signup",
  upload.single("profileImage"),
  authValidationMiddleware(signupSchemaValidation),
  signupUserController,
);
router.post(
  "/login",
  authValidationMiddleware(loginSchemaValidation),
  loginUserController,
);
router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

export default router;
