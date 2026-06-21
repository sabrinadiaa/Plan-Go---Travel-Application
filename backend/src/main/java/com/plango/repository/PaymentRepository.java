package com.plango.repository;

import com.plango.entity.Booking;
import com.plango.entity.Payment;
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
public class PaymentRepository {

    private final JdbcTemplate jdbcTemplate;
    private final BookingRepository bookingRepository;

    public PaymentRepository(
            JdbcTemplate jdbcTemplate,
            BookingRepository bookingRepository
    ) {
        this.jdbcTemplate = jdbcTemplate;
        this.bookingRepository = bookingRepository;
    }

    private Payment mapPayment(java.sql.ResultSet rs) throws java.sql.SQLException {
        Payment payment = new Payment();

        payment.setId(rs.getLong("id"));
        payment.setMethod(rs.getString("method"));
        payment.setStatus(rs.getString("status"));
        payment.setAmount(rs.getDouble("amount"));

        Timestamp paymentDate = rs.getTimestamp("payment_date");
        payment.setPaymentDate(paymentDate != null ? paymentDate.toLocalDateTime() : null);

        Long bookingId = rs.getLong("booking_id");
        Optional<Booking> booking = bookingRepository.findById(bookingId);
        booking.ifPresent(payment::setBooking);

        return payment;
    }

    public List<Payment> findAll() {
        return jdbcTemplate.query(
                "SELECT * FROM payment",
                (rs, rowNum) -> mapPayment(rs)
        );
    }

    public Optional<Payment> findById(Long id) {
        try {
            Payment payment = jdbcTemplate.queryForObject(
                    "SELECT * FROM payment WHERE id = ?",
                    (rs, rowNum) -> mapPayment(rs),
                    id
            );
            return Optional.ofNullable(payment);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public Payment save(Payment payment) {
        if (payment.getId() == null) {
            String sql = """
                    INSERT INTO payment 
                    (booking_id, method, status, amount, payment_date) 
                    VALUES (?, ?, ?, ?, ?)
                    """;

            KeyHolder keyHolder = new GeneratedKeyHolder();

            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setLong(1, payment.getBooking().getId());
                ps.setString(2, payment.getMethod());
                ps.setString(3, payment.getStatus());
                ps.setDouble(4, payment.getAmount() == null ? 0.0 : payment.getAmount());
                ps.setTimestamp(5, Timestamp.valueOf(
                        payment.getPaymentDate() == null ? LocalDateTime.now() : payment.getPaymentDate()
                ));
                return ps;
            }, keyHolder);

            payment.setId(keyHolder.getKey().longValue());
        } else {
            jdbcTemplate.update(
                    "UPDATE payment SET method = ?, status = ?, amount = ?, payment_date = ? WHERE id = ?",
                    payment.getMethod(),
                    payment.getStatus(),
                    payment.getAmount(),
                    Timestamp.valueOf(payment.getPaymentDate()),
                    payment.getId()
            );
        }

        return payment;
    }
    public List<Payment> findByUserId(Long userId) {
        String sql = """
                SELECT p.*
                FROM payment p
                JOIN booking b ON p.booking_id = b.id
                WHERE b.user_id = ?
                ORDER BY p.payment_date DESC, p.id DESC
                """;

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> mapPayment(rs),
                userId
        );
        }
}