package com.plango.controller;

import com.plango.dto.payment.PaymentRequest;
import com.plango.entity.Booking;
import com.plango.entity.Payment;
import com.plango.repository.BookingRepository;
import com.plango.repository.PaymentRepository;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    public PaymentController(
            PaymentRepository paymentRepository,
            BookingRepository bookingRepository
    ) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
    }

    @PostMapping
    public Payment createPayment(@RequestBody PaymentRequest request) {

        Booking booking = bookingRepository.findById(request.getBookingId()).orElse(null);

        if (booking == null) {
            return null;
        }

        Payment payment = new Payment();

        payment.setBooking(booking);
        payment.setMethod(request.getMethod());
        payment.setAmount(booking.getTotalPrice());
        payment.setStatus("SUCCESS");
        payment.setPaymentDate(LocalDateTime.now());

        booking.setStatus("CONFIRMED");
        bookingRepository.save(booking);

        return paymentRepository.save(payment);
    }

    @GetMapping
    public List<Payment> getAll() {
        return paymentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Payment getById(@PathVariable Long id) {
        return paymentRepository.findById(id).orElse(null);
    }
    @GetMapping("/user/{userId}")
        public List<Payment> getPaymentsByUser(@PathVariable Long userId) {
            return paymentRepository.findByUserId(userId);
        }
}