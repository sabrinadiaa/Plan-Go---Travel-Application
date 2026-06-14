import api from "./api";

export const getItineraryById = (id) => {
  return api.get(`/itinerary/${id}`);
};

export const addDestinationToItinerary = (itineraryId, destinationId) => {
  return api.post(`/itinerary/${itineraryId}/destination`, {
    destinationId: destinationId,
  });
};