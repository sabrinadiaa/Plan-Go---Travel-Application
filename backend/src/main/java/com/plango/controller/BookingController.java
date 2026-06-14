package com.plango.controller;

import com.plango.dto.booking.BookingRequest;
import com.plango.entity.Booking;
import com.plango.entity.User;
import com.plango.entity.Itinerary;
import com.plango.entity.ItineraryItem;

import com.plango.repository.BookingRepository;
import com.plango.repository.UserRepository;
import com.plango.repository.ItineraryRepository;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/booking")
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

    @PostMapping
    public String create(
            @RequestBody BookingRequest request
    ) {

        User user =
                userRepository.findById(request.getUserId())
                        .orElse(null);

        Itinerary itinerary =
                itineraryRepository.findById(request.getItineraryId())
                        .orElse(null);

        if(user == null || itinerary == null){
            return "Data tidak ditemukan";
        }

        Booking booking = new Booking();

        booking.setUser(user);
        booking.setItinerary(itinerary);

        booking.setStatus("PENDING");

        booking.setBookingDate(
                LocalDateTime.now()
        );

        booking.setBookingCode(
                UUID.randomUUID()
                        .toString()
                        .substring(0,8)
                        .toUpperCase()
        );

        double total = 0;

        for(ItineraryItem item : itinerary.getItems()) {
                total += item.getDestination().getPrice();
        }

        booking.setTotalPrice(total);

        bookingRepository.save(booking);

        return "Booking berhasil dibuat";
    }

    @GetMapping
    public List<Booking> getAll(){
        return bookingRepository.findAll();
    }

    @GetMapping("/{id}")
    public Booking getById(@PathVariable Long id){

        return bookingRepository
                .findById(id)
                .orElse(null);
    }

    @PutMapping("/{id}/confirm")
    public String confirmBooking(
            @PathVariable Long id
    ) {

        Booking booking =
                bookingRepository.findById(id)
                        .orElse(null);

        if(booking == null){
            return "Booking tidak ditemukan";
        }

        booking.setStatus("CONFIRMED");

        bookingRepository.save(booking);

        return "Booking berhasil dikonfirmasi";
    }

    @PutMapping("/{id}/cancel")
    public String cancelBooking(
            @PathVariable Long id
    ) {

        Booking booking =
                bookingRepository.findById(id)
                        .orElse(null);

        if(booking == null){
            return "Booking tidak ditemukan";
        }

        booking.setStatus("CANCELLED");

        bookingRepository.save(booking);

        return "Booking dibatalkan";
    }

    @GetMapping("/user/{userId}")
        public List<Booking> getUserBookings(
                @PathVariable Long userId
        ){
        return bookingRepository.findByUserId(userId);
        }
}