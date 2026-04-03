import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  createTripController,
  getTripsByUserController,
  updateTripController,
  deleteTripController,
  getTripsByIdController,
  downloadTripPDF,
} from "../controllers/trip.controller.js";
import { authorizeMiddleware } from "../middleware/authorize.middleware.js";
const router = express.Router();

router.post("/create", authMiddleware, createTripController);
router.get("/my-trips", authMiddleware, getTripsByUserController);
router.put(
  "/update/:id",
  authMiddleware,
  authorizeMiddleware,
  updateTripController,
);
router.delete(
  "/delete/:id",
  authMiddleware,
  authorizeMiddleware,
  deleteTripController,
);
router.get("/:id/summary", authMiddleware, downloadTripPDF);
router.get("/:id", authMiddleware, authorizeMiddleware, getTripsByIdController);

export default router;
