import api from "./api";

export const getItineraries = () => {
  return api.get("/itinerary");
};

export const getUserItineraries = (userId) => {
  return api.get(`/itinerary/user/${userId}`);
};

export const getItineraryById = (id) => {
  return api.get(`/itinerary/${id}`);
};

export const createItinerary = (userId, title, totalPeople) => {
  return api.post("/itinerary", {
    userId: userId,
    title: title,
    totalPeople: totalPeople,
  });
};

export const updateItinerary = (itineraryId, title, totalPeople) => {
  return api.put(`/itinerary/${itineraryId}`, {
    userId: 1,
    title: title,
    totalPeople: totalPeople,
  });
};

export const addDestinationToItinerary = (itineraryId, destinationId) => {
  return api.post(`/itinerary/${itineraryId}/destination`, {
    destinationId: destinationId,
  });
};

export const deleteItineraryItem = (itemId) => {
  return api.delete(`/itinerary/item/${itemId}`);
};

export const updateItineraryItemVisitTime = (itemId, visitTime) => {
  return api.put(`/itinerary/item/${itemId}/visit-time`, {
    visitTime: visitTime,
  });
};