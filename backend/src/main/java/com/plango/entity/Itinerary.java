package com.plango.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Itinerary {

    private Long id;
    private User user;
    private String title;
    private Integer totalPeople;
    private LocalDateTime createdAt;
    private List<ItineraryItem> items = new ArrayList<>();

    public Itinerary() {
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getTitle() {
        return title;
    }

    public Integer getTotalPeople() {
        return totalPeople;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public List<ItineraryItem> getItems() {
        return items;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setTotalPeople(Integer totalPeople) {
        this.totalPeople = totalPeople;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setItems(List<ItineraryItem> items) {
        this.items = items;
    }
}