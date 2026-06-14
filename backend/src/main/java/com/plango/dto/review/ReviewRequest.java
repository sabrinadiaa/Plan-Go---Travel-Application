package com.plango.dto.review;

public class ReviewRequest {

    private Long userId;
    private Long destinationId;
    private Integer rating;
    private String comment;

    public Long getUserId() {
        return userId;
    }

    public Long getDestinationId() {
        return destinationId;
    }

    public Integer getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setDestinationId(Long destinationId) {
        this.destinationId = destinationId;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}