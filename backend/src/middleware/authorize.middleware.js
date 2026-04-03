import TripSchema from "../models/trips.schema.js";
import SharedTrip from "../models/sharedTrip.schema.js";
export const authorizeMiddleware = async (req, res, next) => {
  const userId = req.user.id;
  const { tripId } = req.params;

  const trip = await TripSchema.findById(tripId);
  if (!trip) {
    return res.status(404).json({ message: "Trip not found" });
  }
  if (trip.created_by.toString() === userId) {
    req.role = "owner";
    return next();
  }
  const sharedTrip = await SharedTrip.findOne({
    trip: tripId,
    "participants.user": userId,
  });
  if (sharedTrip) {
    req.role = "member";
    return next();
  }
  return res.status(403).json({ message: "Access Denied" });
};
