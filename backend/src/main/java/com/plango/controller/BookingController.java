package com.plango.controller;

import com.plango.dto.booking.BookingRequest;
import com.plango.entity.Booking;
import com.plango.entity.Itinerary;
import com.plango.entity.ItineraryItem;
import com.plango.entity.User;
import com.plango.repository.BookingRepository;
import com.plango.repository.ItineraryRepository;
import com.plango.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ItineraryRepository itineraryRepository;

    public BookingController(
            BookingRepository bookingRepository,
            UserRepository userRepository,
            ItineraryRepository itineraryRepository
    ) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.itineraryRepository = itineraryRepository;
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking tidak ditemukan"));
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    @PostMapping
    public Booking create(@RequestBody BookingRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        Itinerary itinerary = itineraryRepository.findById(request.getItineraryId())
                .orElseThrow(() -> new RuntimeException("Itinerary tidak ditemukan"));


        Booking booking = new Booking();

        booking.setUser(user);
        booking.setItinerary(itinerary);
        booking.setStatus("PENDING");
        booking.setCreatedAt(LocalDateTime.now());
        booking.setBookingDate(LocalDateTime.now());
        booking.setBookingCode("PG-" + System.currentTimeMillis());

        double totalPrice = 0.0;

        if (itinerary.getItems() != null) {
            for (ItineraryItem item : itinerary.getItems()) {
                if (item.getDestination() != null) {
                    Double price = item.getDestination().getPrice();

                    if (price != null) {
                        totalPrice += price;
                    }
                }
            }
        }

        int totalPeople = itinerary.getTotalPeople() == null
                ? 1
                : itinerary.getTotalPeople();

        booking.setTotalPrice(totalPrice * totalPeople);

        booking.setSnapshotTitle(itinerary.getTitle());

        StringBuilder destinations = new StringBuilder();

        LocalDateTime tripStart = null;
        LocalDateTime tripEnd = null;

        String imageUrl = null;
        String location = null;

        if (itinerary.getItems() != null) {
        for (ItineraryItem item : itinerary.getItems()) {
                if (item.getDestination() != null) {
                if (destinations.length() > 0) {
                        destinations.append(", ");
                }

                destinations.append(item.getDestination().getName());

                if (imageUrl == null) {
                        imageUrl = item.getDestination().getImageUrl();
                }

                if (location == null) {
                        location = item.getDestination().getLocation();
                }
                }

                if (item.getVisitTime() != null) {
                if (tripStart == null || item.getVisitTime().isBefore(tripStart)) {
                        tripStart = item.getVisitTime();
                }

                if (tripEnd == null || item.getVisitTime().isAfter(tripEnd)) {
                        tripEnd = item.getVisitTime();
                }
                }
        }
        }

        booking.setSnapshotDestinations(destinations.toString());
        booking.setSnapshotImageUrl(imageUrl);
        booking.setSnapshotLocation(location);
        booking.setTripStart(tripStart);
        booking.setTripEnd(tripEnd);

        return bookingRepository.save(booking);
    }

    @PutMapping("/{id}/status")
    public String updateBookingStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking tidak ditemukan"));

        bookingRepository.updateStatus(id, status);

        return "Status booking berhasil diupdate";
    }

    @DeleteMapping("/{id}")
    public String deleteBooking(@PathVariable Long id) {
        bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking tidak ditemukan"));

        bookingRepository.deleteById(id);

        return "Booking berhasil dihapus";
    }
}