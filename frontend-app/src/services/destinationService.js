import api from "./api";

export const getDestinations = () => {
  return api.get("/destination");
};

export const getDestinationById = (id) => {
  return api.get(`/destination/${id}`);
};