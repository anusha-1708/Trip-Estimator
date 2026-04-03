import TripSchema from "../models/trips.schema.js";
import SharedTrip from "../models/sharedTrip.schema.js";

export const shareTripService = async ({ tripId, userIds, currentUser }) => {
  const trip = await TripSchema.findById(tripId);
  if (!trip) {
    throw new Error("Trip not found");
  }

  if (trip.created_by.toString() !== currentUser) {
    throw new Error("Not authorized");
  }

  let sharedTrip = await SharedTrip.findOne({ trip: tripId });

  if (!sharedTrip) {
    sharedTrip = new SharedTrip({
      trip: tripId,
      owner: currentUser,
      participants: [],
    });
  }

  userIds.forEach((id) => {
    const existsUser = sharedTrip.participants.find(
      (p) => p.user.toString() === id,
    );

    if (!existsUser && id !== currentUser) {
      sharedTrip.participants.push({ user: id });
    }
  });
  await sharedTrip.save();

  return sharedTrip;
};

export const getSharedTripsService = async (userId) => {
  const sharedTrip = await SharedTrip.find({
    "participants.user": userId,
  }).populate("trip");
  return sharedTrip;
};

export const getSharedTripByIdService = async (sharedTripId, userId) => {
  const sharedTrip = await SharedTrip.findById(sharedTripId).populate("trip");
  if (!sharedTrip) {
    throw new Error("Shared trip not found");
  }
  const isParticipant = sharedTrip.participants.some(
    (p) => p.user.toString() === userId,
  );
  if (!isParticipant) {
    throw new Error("Not authorized");
  }
  return sharedTrip;
};
export const updateSharedTripService = async (
  sharedTripId,
  userIds,
  currentUser,
) => {
  const sharedTrip = await SharedTrip.findById(sharedTripId);
  if (!sharedTrip) {
    throw new Error("Shared trip not found");
  }
  const trip = await TripSchema.findById(sharedTrip.trip);
  if (trip.created_by.toString() !== currentUser) {
    throw new Error("Not authorized");
  }
  sharedTrip.participants = userIds
    .filter((id) => id !== currentUser)
    .map((id) => ({ user: id }));
  await sharedTrip.save();
  return sharedTrip;
};

export const deleteSharedTripService = async (sharedTripId, currentUser) => {
  const sharedTrip = await SharedTrip.findById(sharedTripId);
  if (!sharedTrip) {
    throw new Error("Shared trip not found");
  }
  const trip = await TripSchema.findById(sharedTrip.trip);
  if (trip.created_by.toString() !== currentUser) {
    throw new Error("Not authorized");
  }

  await SharedTrip.findByIdAndDelete(sharedTripId);
  return { message: "Shared trip deleted successfully" };
};
