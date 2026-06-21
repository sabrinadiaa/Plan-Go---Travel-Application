import api from "./api";

export const createPayment = (bookingId, method) => {
  return api.post("/payment", {
    bookingId: bookingId,
    method: method,
  });
};

export const getUserPayments = (userId) => {
  return api.get(`/payment/user/${userId}`);
};

export const getPaymentById = (id) => {
  return api.get(`/payment/${id}`);
};