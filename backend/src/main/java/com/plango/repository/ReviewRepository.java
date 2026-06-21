package com.plango.repository;

import com.plango.entity.Destination;
import com.plango.entity.Review;
import com.plango.entity.User;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public class ReviewRepository {

    private final JdbcTemplate jdbcTemplate;
    private final UserRepository userRepository;
    private final DestinationRepository destinationRepository;

    public ReviewRepository(
            JdbcTemplate jdbcTemplate,
            UserRepository userRepository,
            DestinationRepository destinationRepository
    ) {
        this.jdbcTemplate = jdbcTemplate;
        this.userRepository = userRepository;
        this.destinationRepository = destinationRepository;
    }

    private Review mapReview(java.sql.ResultSet rs) throws java.sql.SQLException {
        Review review = new Review();

        review.setId(rs.getLong("id"));
        review.setRating(rs.getInt("rating"));
        review.setComment(rs.getString("comment"));

        Timestamp reviewDate = rs.getTimestamp("review_date");
        review.setReviewDate(reviewDate != null ? reviewDate.toLocalDateTime() : null);

        Optional<User> user = userRepository.findById(rs.getLong("user_id"));
        user.ifPresent(review::setUser);

        Optional<Destination> destination = destinationRepository.findById(rs.getLong("destination_id"));
        destination.ifPresent(review::setDestination);

        return review;
    }

    public List<Review> findAll() {
        return jdbcTemplate.query(
                "SELECT * FROM review",
                (rs, rowNum) -> mapReview(rs)
        );
    }

    public Optional<Review> findById(Long id) {
        try {
            Review review = jdbcTemplate.queryForObject(
                    "SELECT * FROM review WHERE id = ?",
                    (rs, rowNum) -> mapReview(rs),
                    id
            );
            return Optional.ofNullable(review);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public List<Review> findByDestinationId(Long destinationId) {
        return jdbcTemplate.query(
                "SELECT * FROM review WHERE destination_id = ?",
                (rs, rowNum) -> mapReview(rs),
                destinationId
        );
    }

    public List<Review> findByUserId(Long userId) {
        return jdbcTemplate.query(
                "SELECT * FROM review WHERE user_id = ?",
                (rs, rowNum) -> mapReview(rs),
                userId
        );
    }

    public Review save(Review review) {
        if (review.getId() == null) {
            String sql = """
                    INSERT INTO review 
                    (user_id, destination_id, rating, comment, review_date) 
                    VALUES (?, ?, ?, ?, ?)
                    """;

            KeyHolder keyHolder = new GeneratedKeyHolder();

            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setLong(1, review.getUser().getId());
                ps.setLong(2, review.getDestination().getId());
                ps.setInt(3, review.getRating());
                ps.setString(4, review.getComment());
                ps.setTimestamp(5, Timestamp.valueOf(
                        review.getReviewDate() == null ? LocalDateTime.now() : review.getReviewDate()
                ));
                return ps;
            }, keyHolder);

            review.setId(keyHolder.getKey().longValue());
        } else {
            jdbcTemplate.update(
                    "UPDATE review SET rating = ?, comment = ? WHERE id = ?",
                    review.getRating(),
                    review.getComment(),
                    review.getId()
            );
        }

        return review;
    }
}