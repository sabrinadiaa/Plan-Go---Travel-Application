package com.plango.repository;

import com.plango.entity.Booking;
import com.plango.entity.Itinerary;
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
public class BookingRepository {

    private final JdbcTemplate jdbcTemplate;
    private final UserRepository userRepository;
    private final ItineraryRepository itineraryRepository;

    public BookingRepository(
            JdbcTemplate jdbcTemplate,
            UserRepository userRepository,
            ItineraryRepository itineraryRepository
    ) {
        this.jdbcTemplate = jdbcTemplate;
        this.userRepository = userRepository;
        this.itineraryRepository = itineraryRepository;
    }

    private Booking mapBooking(java.sql.ResultSet rs) throws java.sql.SQLException {
        Booking booking = new Booking();

        booking.setId(rs.getLong("id"));
        booking.setStatus(rs.getString("status"));
        booking.setTotalPrice(rs.getDouble("total_price"));
        booking.setBookingCode(rs.getString("booking_code"));
        booking.setSnapshotTitle(rs.getString("snapshot_title"));
        booking.setSnapshotDestinations(rs.getString("snapshot_destinations"));
        booking.setSnapshotImageUrl(rs.getString("snapshot_image_url"));
        booking.setSnapshotLocation(rs.getString("snapshot_location"));

        Timestamp tripStart = rs.getTimestamp("trip_start");
        if (tripStart != null) {
            booking.setTripStart(tripStart.toLocalDateTime());
        }

        Timestamp tripEnd = rs.getTimestamp("trip_end");
        if (tripEnd != null) {
            booking.setTripEnd(tripEnd.toLocalDateTime());
        }

        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            booking.setCreatedAt(createdAt.toLocalDateTime());
        }

        Timestamp bookingDate = rs.getTimestamp("booking_date");
        if (bookingDate != null) {
            booking.setBookingDate(bookingDate.toLocalDateTime());
        }

        Long userId = rs.getLong("user_id");
        Optional<User> user = userRepository.findById(userId);
        user.ifPresent(booking::setUser);

        Long itineraryId = rs.getLong("itinerary_id");
        Optional<Itinerary> itinerary = itineraryRepository.findById(itineraryId);
        itinerary.ifPresent(booking::setItinerary);

        return booking;
    }

    public List<Booking> findAll() {
        String sql = """
                SELECT *
                FROM booking
                WHERE (status IS NULL OR status <> 'DELETED')
                ORDER BY created_at DESC, id DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapBooking(rs));
    }

    public Optional<Booking> findById(Long id) {
        try {
            String sql = "SELECT * FROM booking WHERE id = ?";
            Booking booking = jdbcTemplate.queryForObject(
                    sql,
                    (rs, rowNum) -> mapBooking(rs),
                    id
            );

            return Optional.ofNullable(booking);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public List<Booking> findByUserId(Long userId) {
        String sql = """
                SELECT *
                FROM booking
                WHERE user_id = ?
                AND (status IS NULL OR status <> 'DELETED')
                ORDER BY created_at DESC, id DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapBooking(rs), userId);
    }

    public Booking save(Booking booking) {
        if (booking.getId() == null) {
            String sql = """
                    INSERT INTO booking
                    (user_id, itinerary_id, status, total_price, created_at, booking_code, booking_date,
                    snapshot_title, snapshot_destinations, snapshot_image_url, snapshot_location, trip_start, trip_end)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""";

            KeyHolder keyHolder = new GeneratedKeyHolder();

            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(
                        sql,
                        Statement.RETURN_GENERATED_KEYS
                );

                ps.setLong(1, booking.getUser().getId());
                ps.setLong(2, booking.getItinerary().getId());
                ps.setString(3, booking.getStatus());
                ps.setDouble(4, booking.getTotalPrice() == null ? 0.0 : booking.getTotalPrice());
                ps.setString(8, booking.getSnapshotTitle());
                ps.setString(9, booking.getSnapshotDestinations());
                ps.setString(10, booking.getSnapshotImageUrl());
                ps.setString(11, booking.getSnapshotLocation());
                ps.setTimestamp(12, booking.getTripStart() == null ? null : Timestamp.valueOf(booking.getTripStart()));
                ps.setTimestamp(13, booking.getTripEnd() == null ? null : Timestamp.valueOf(booking.getTripEnd()));

                LocalDateTime createdAt = booking.getCreatedAt() == null
                        ? LocalDateTime.now()
                        : booking.getCreatedAt();

                LocalDateTime bookingDate = booking.getBookingDate() == null
                        ? LocalDateTime.now()
                        : booking.getBookingDate();

                ps.setTimestamp(5, Timestamp.valueOf(createdAt));
                ps.setString(6, booking.getBookingCode());
                ps.setTimestamp(7, Timestamp.valueOf(bookingDate));

                return ps;
            }, keyHolder);

            if (keyHolder.getKey() != null) {
                booking.setId(keyHolder.getKey().longValue());
            }

        } else {
            String sql = """
                    UPDATE booking
                    SET user_id = ?, itinerary_id = ?, status = ?, total_price = ?,
                        created_at = ?, booking_code = ?, booking_date = ?
                    WHERE id = ?
                    """;

            jdbcTemplate.update(
                    sql,
                    booking.getUser().getId(),
                    booking.getItinerary().getId(),
                    booking.getStatus(),
                    booking.getTotalPrice(),
                    Timestamp.valueOf(
                            booking.getCreatedAt() == null
                                    ? LocalDateTime.now()
                                    : booking.getCreatedAt()
                    ),
                    booking.getBookingCode(),
                    Timestamp.valueOf(
                            booking.getBookingDate() == null
                                    ? LocalDateTime.now()
                                    : booking.getBookingDate()
                    ),
                    booking.getId()
            );
        }

        return booking;
    }

    public void updateStatus(Long id, String status) {
        String sql = "UPDATE booking SET status = ? WHERE id = ?";
        jdbcTemplate.update(sql, status, id);
    }

    public void deleteById(Long id) {
    // Jangan hapus payment, karena payment adalah history pembayaran.
    // Booking hanya disembunyikan dari menu booking dengan status DELETED.
        jdbcTemplate.update(
                "UPDATE booking SET status = 'DELETED' WHERE id = ?",
                id
        );
    }

    public Optional<Booking> findExistingBooking(Long userId, Long itineraryId) {
    try {
        String sql = """
                SELECT *
                FROM booking
                WHERE user_id = ?
                  AND itinerary_id = ?
                  AND status NOT IN ('DELETED', 'CANCELLED')
                ORDER BY
                    CASE
                        WHEN status = 'CONFIRMED' THEN 1
                        WHEN status = 'PENDING' THEN 2
                        ELSE 3
                    END,
                    created_at DESC,
                    id DESC
                LIMIT 1
                """;

        Booking booking = jdbcTemplate.queryForObject(
                sql,
                (rs, rowNum) -> mapBooking(rs),
                userId,
                itineraryId
        );

        return Optional.ofNullable(booking);
    } catch (Exception e) {
        return Optional.empty();
    }
}
}