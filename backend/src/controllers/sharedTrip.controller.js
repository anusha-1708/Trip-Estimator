import {
  shareTripService,
  getSharedTripsService,
  updateSharedTripService,
  deleteSharedTripService,
} from "../services/sharedTrip.service.js";

export const shareTripController = async (req, res) => {
  try {
    const { tripId, userIds } = req.body;
    const currentUser = req.user.id;

    if (!tripId || !userIds || userIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "tripId and userIds are required",
      });
    }
    const sharedTrip = await shareTripService({
      tripId,
      userIds,
      currentUser,
    });
    res.status(200).json({
      success: true,
      message: "Trip shared successfully",
      data: sharedTrip,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSharedTripsController = async (req, res) => {
  try {
    const userId = req.user.id;
    const sharedTrips = await getSharedTripsService(userId);
    res.status(200).json({
      success: true,
      data: sharedTrips,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSharedTripController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const sharedTrip = await getSharedTripController(id, userId);
    res.status(200).json({
      success: true,
      data: sharedTrip,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSharedTripController = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = req.user.id;
    const { userIds } = req.body;
    if (!userIds || userIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "UserIds are required",
      });
    }

    const updateTrip = await updateSharedTripService(id, userIds, currentUser);
    res.status(200).json({
      success: true,
      message: "Shared trip updated successfully",
      data: updateTrip,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSharedTripController = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = req.user.id;
    const deleteTrip = await deleteSharedTripService(id, currentUser);
    res.status(200).json({
      success: true,
      message: "Shared trip deleted successfully",
      data: deleteTrip,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
