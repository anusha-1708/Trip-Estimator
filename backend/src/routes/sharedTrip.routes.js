import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  shareTripController,
  getSharedTripsController,
  updateSharedTripController,
  deleteSharedTripController,
  getSharedTripController,
} from "../controllers/sharedTrip.controller.js";
const router = express.Router();

router.post("/share", authMiddleware, shareTripController);
router.get("/", authMiddleware, getSharedTripsController);
router.put("/:id", authMiddleware, updateSharedTripController);
router.delete("/:id", authMiddleware, deleteSharedTripController);
router.get("/:id", authMiddleware, getSharedTripController);

export default router;
