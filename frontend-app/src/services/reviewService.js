import api from "./api";

export const createReview = (userId, destinationId, rating, comment) => {
  return api.post("/review", {
    userId: userId,
    destinationId: destinationId,
    rating: rating,
    comment: comment,
  });
};

export const getReviews = () => {
  return api.get("/review");
};

export const getReviewsByDestination = (destinationId) => {
  return api.get(`/review/destination/${destinationId}`);
};