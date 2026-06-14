package com.plango.entity;

import jakarta.persistence.*;
import java.time.LocalTime;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class ItineraryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalTime visitTime;

   @ManyToOne
   @JsonBackReference
   private Itinerary itinerary;

    @ManyToOne
    private Destination destination;

    // Getter
    public Long getId() {
        return id;
    }

    public LocalTime getVisitTime() {
        return visitTime;
    }

    public Itinerary getItinerary() {
        return itinerary;
    }

    public Destination getDestination() {
        return destination;
    }

    // Setter
    public void setVisitTime(LocalTime visitTime) {
        this.visitTime = visitTime;
    }

    public void setItinerary(Itinerary itinerary) {
        this.itinerary = itinerary;
    }

    public void setDestination(Destination destination) {
        this.destination = destination;
    }
}