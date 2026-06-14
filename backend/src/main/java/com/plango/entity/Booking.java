package com.plango.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bookingCode;
    private String status;
    private Double totalPrice;
    private LocalDateTime bookingDate;

    @ManyToOne
    private User user;

    @OneToOne
    private Itinerary itinerary;

    // Getter
    public Long getId() {
        return id;
    }

    public String getBookingCode() {
        return bookingCode;
    }

    public String getStatus() {
        return status;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public User getUser() {
        return user;
    }

    public Itinerary getItinerary() {
        return itinerary;
    }

    // Setter
    public void setBookingCode(String bookingCode) {
        this.bookingCode = bookingCode;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setItinerary(Itinerary itinerary) {
        this.itinerary = itinerary;
    }
}