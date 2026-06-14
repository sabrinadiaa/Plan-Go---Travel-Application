import api from "./api";

export const createPayment = (bookingId, method) => {
  return api.post("/payment", {
    bookingId: bookingId,
    method: method,
  });
};