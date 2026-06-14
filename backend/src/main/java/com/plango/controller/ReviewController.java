package com.plango.controller;

import com.plango.dto.review.ReviewRequest;
import com.plango.entity.Review;
import com.plango.entity.User;
import com.plango.entity.Destination;

import com.plango.repository.ReviewRepository;
import com.plango.repository.UserRepository;
import com.plango.repository.DestinationRepository;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/review")
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final DestinationRepository destinationRepository;

    public ReviewController(
            ReviewRepository reviewRepository,
            UserRepository userRepository,
            DestinationRepository destinationRepository
    ) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.destinationRepository = destinationRepository;
    }

    @PostMapping
    public String createReview(@RequestBody ReviewRequest request) {

        User user = userRepository.findById(request.getUserId()).orElse(null);
        Destination destination = destinationRepository.findById(request.getDestinationId()).orElse(null);

        if (user == null || destination == null) {
            return "Data tidak ditemukan";
        }

        Review review = new Review();

        review.setUser(user);
        review.setDestination(destination);
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setReviewDate(LocalDateTime.now());

        reviewRepository.save(review);

        return "Review berhasil disimpan";
    }

    @GetMapping
    public List<Review> getAll() {
        return reviewRepository.findAll();
    }

    @GetMapping("/destination/{destinationId}")
    public List<Review> getByDestination(@PathVariable Long destinationId) {
        return reviewRepository.findByDestinationId(destinationId);
    }

    @GetMapping("/user/{userId}")
    public List<Review> getByUser(@PathVariable Long userId) {
        return reviewRepository.findByUserId(userId);
    }
}