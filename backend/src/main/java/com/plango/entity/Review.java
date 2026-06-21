package com.plango.entity;

import java.time.LocalDateTime;

public class Review {

    private Long id;
    private User user;
    private Destination destination;
    private Integer rating;
    private String comment;
    private LocalDateTime reviewDate;

    public Review() {
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Destination getDestination() {
        return destination;
    }

    public Integer getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public LocalDateTime getReviewDate() {
        return reviewDate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setDestination(Destination destination) {
        this.destination = destination;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setReviewDate(LocalDateTime reviewDate) {
        this.reviewDate = reviewDate;
    }
}