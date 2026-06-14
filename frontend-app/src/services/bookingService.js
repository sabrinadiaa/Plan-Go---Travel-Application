import api from "./api";

export const createBooking = (userId, itineraryId) => {
  return api.post("/booking", {
    userId: userId,
    itineraryId: itineraryId,
  });
};

export const getUserBookings = (userId) => {
  return api.get(`/booking/user/${userId}`);
};

export const getBookingById = (id) => {
  return api.get(`/booking/${id}`);
};