package com.plango.entity;

import java.time.LocalDateTime;

public class ItineraryItem {

    private Long id;
    private Itinerary itinerary;
    private Destination destination;
    private LocalDateTime visitTime;

    public ItineraryItem() {
    }

    public Long getId() {
        return id;
    }

    public Itinerary getItinerary() {
        return itinerary;
    }

    public Destination getDestination() {
        return destination;
    }

    public LocalDateTime getVisitTime() {
        return visitTime;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setItinerary(Itinerary itinerary) {
        this.itinerary = itinerary;
    }

    public void setDestination(Destination destination) {
        this.destination = destination;
    }

    public void setVisitTime(LocalDateTime visitTime) {
        this.visitTime = visitTime;
    }
}