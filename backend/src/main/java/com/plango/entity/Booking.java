package com.plango.entity;

import java.time.LocalDateTime;

public class Booking {

    private Long id;
    private User user;
    private Itinerary itinerary;
    private String status;
    private Double totalPrice;
    private LocalDateTime createdAt;

    private String bookingCode;
    private LocalDateTime bookingDate;

    // Snapshot data supaya history booking tidak ikut berubah
    // saat itinerary lama diedit
    private String snapshotTitle;
    private String snapshotDestinations;
    private String snapshotImageUrl;
    private String snapshotLocation;
    private LocalDateTime tripStart;
    private LocalDateTime tripEnd;

    public Booking() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Itinerary getItinerary() {
        return itinerary;
    }

    public void setItinerary(Itinerary itinerary) {
        this.itinerary = itinerary;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getBookingCode() {
        return bookingCode;
    }

    public void setBookingCode(String bookingCode) {
        this.bookingCode = bookingCode;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getSnapshotTitle() {
        return snapshotTitle;
    }

    public void setSnapshotTitle(String snapshotTitle) {
        this.snapshotTitle = snapshotTitle;
    }

    public String getSnapshotDestinations() {
        return snapshotDestinations;
    }

    public void setSnapshotDestinations(String snapshotDestinations) {
        this.snapshotDestinations = snapshotDestinations;
    }

    public String getSnapshotImageUrl() {
        return snapshotImageUrl;
    }

    public void setSnapshotImageUrl(String snapshotImageUrl) {
        this.snapshotImageUrl = snapshotImageUrl;
    }

    public String getSnapshotLocation() {
        return snapshotLocation;
    }

    public void setSnapshotLocation(String snapshotLocation) {
        this.snapshotLocation = snapshotLocation;
    }

    public LocalDateTime getTripStart() {
        return tripStart;
    }

    public void setTripStart(LocalDateTime tripStart) {
        this.tripStart = tripStart;
    }

    public LocalDateTime getTripEnd() {
        return tripEnd;
    }

    public void setTripEnd(LocalDateTime tripEnd) {
        this.tripEnd = tripEnd;
    }
}