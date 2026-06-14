package com.plango.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Itinerary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Integer totalPeople;

    private LocalDate startDate;

    private LocalDate endDate;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy="itinerary")
    @JsonManagedReference
    private List<ItineraryItem> items;

    // Getter
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Integer getTotalPeople() {
        return totalPeople;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public User getUser() {
        return user;
    }

    public List<ItineraryItem> getItems() {
        return items;
    }

    // Setter
    public void setTitle(String title) {
        this.title = title;
    }

    public void setTotalPeople(Integer totalPeople) {
        this.totalPeople = totalPeople;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setItems(List<ItineraryItem> items) {
        this.items = items;
    }
}