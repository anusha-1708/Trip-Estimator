import {
  createTripService,
  getTripsByUserService,
  getTripByIDService,
  updateTripService,
  deletedTripService,
  generateTripSummaryPDF,
} from "../services/trip.service.js";

export const createTripController = async (req, res) => {
  try {
    const userId = req.user.id;
    const newTrip = await createTripService(req.body, userId);
    res.status(201).json({
      success: true,
      message: "Trip created successfully",
      data: newTrip,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTripsByUserController = async (req, res) => {
  try {
    const userId = req.user.id;
    const trips = await getTripsByUserService(userId);
    res.status(200).json({
      success: true,
      data: trips,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTripsByIdController = async (req, res) => {
  try {
    const userId = req.user.id;
    const getTripById = await getTripByIDService(req.params.id, userId);
    if (!getTripById) {
      throw new Error("Trip not found");
    }
    res.status(201).json({ success: true, data: getTripById });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTripController = async (req, res) => {
  try {
    if (req.role !== "owner") {
      return res
        .status(403)
        .json({ message: "Only owner can update the trip" });
    }
    const userId = req.user.id;
    const trip = await updateTripService(req.params.id, req.body, userId);
    if (!trip) {
      throw new Error("Trip not found");
    }
    res.status(201).json({
      success: true,
      message: "Trip updated successfully",
      data: trip,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTripController = async (req, res) => {
  try {
    if (req.role !== "owner") {
      return res.status(403).json({
        message: "Only owner can delete",
      });
    }
    const userId = req.user.id;
    const deletetrip = await deletedTripService(req.params.id, userId);
    if (!deletetrip) {
      throw new Error("Trip not found");
    }
    res
      .status(201)
      .json({ success: true, message: "Trip deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const downloadTripPDF = async (req, res) => {
  const pdf = await generateTripSummaryPDF(req.params.id);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=trip.pdf");

  res.send(pdf);
};
