import api from "./axiosInstance";

export const getSharedTrips = async () => {
  const response = await api.get("/shared-trips");
  return response.data;
};

export const createSharedTrip = async (data) => {
  const response = await api.post("/shared-trips/share", data);
  return response.data;
};
