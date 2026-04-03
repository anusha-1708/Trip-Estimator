import api from "./axiosInstance";

export const createTrip = async (data) => {
  const response = await api.post("/trips/create", data);
  return response.data;
};

export const getTripsByUser = async () => {
  const response = await api.get("/trips/my-trips");
  return response.data;
};

export const getTripById = async (id) => {
  const response = await api.get(`/trips/${id}`);
  return response.data;
};

export const updateTrip = async (id, data) => {
  const response = await api.put(`/trips/update/${id}`, data);
  return response.data;
};

export const deleteTrip = async (id) => {
  const response = await api.delete(`/trips/delete/${id}`);
  return response.data;
};

export const shareTrip = async (id) => {
  const response = await api.post(`/trips/${id}/share`);
  return response.data;
};

export const downloadTripSummary = async (id) => {
  const response = await api.get(`/trips/${id}/summary`, {
    responseType: "blob",
  });
  return response.data;
};
