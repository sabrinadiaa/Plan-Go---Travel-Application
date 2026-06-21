package com.plango.repository;

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
public class ItineraryRepository {

    private final JdbcTemplate jdbcTemplate;
    private final UserRepository userRepository;
    private final ItineraryItemRepository itineraryItemRepository;

    public ItineraryRepository(
            JdbcTemplate jdbcTemplate,
            UserRepository userRepository,
            ItineraryItemRepository itineraryItemRepository
    ) {
        this.jdbcTemplate = jdbcTemplate;
        this.userRepository = userRepository;
        this.itineraryItemRepository = itineraryItemRepository;
    }

    private Itinerary mapItinerary(java.sql.ResultSet rs) throws java.sql.SQLException {
        Itinerary itinerary = new Itinerary();

        itinerary.setId(rs.getLong("id"));
        itinerary.setTitle(rs.getString("title"));
        itinerary.setTotalPeople(rs.getInt("total_people"));

        Timestamp createdAt = rs.getTimestamp("created_at");

        if (createdAt != null) {
            itinerary.setCreatedAt(createdAt.toLocalDateTime());
        }

        Long userId = rs.getLong("user_id");

        Optional<User> user = userRepository.findById(userId);

        user.ifPresent(itinerary::setUser);

        itinerary.setItems(
                itineraryItemRepository.findByItineraryId(itinerary.getId())
        );

        return itinerary;
    }

    public List<Itinerary> findAll() {
        String sql = "SELECT * FROM itinerary ORDER BY created_at DESC";

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> mapItinerary(rs)
        );
    }

    public Optional<Itinerary> findById(Long id) {
        try {
            String sql = "SELECT * FROM itinerary WHERE id = ?";

            Itinerary itinerary = jdbcTemplate.queryForObject(
                    sql,
                    (rs, rowNum) -> mapItinerary(rs),
                    id
            );

            return Optional.ofNullable(itinerary);

        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public List<Itinerary> findByUserId(Long userId) {
        String sql = """
                SELECT *
                FROM itinerary
                WHERE user_id = ?
                ORDER BY created_at DESC, id DESC
                """;

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> mapItinerary(rs),
                userId
        );
    }

    public Itinerary save(Itinerary itinerary) {
        if (itinerary.getId() == null) {
            String sql = """
                    INSERT INTO itinerary
                    (user_id, title, total_people, created_at)
                    VALUES (?, ?, ?, ?)
                    """;

            KeyHolder keyHolder = new GeneratedKeyHolder();

            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(
                        sql,
                        Statement.RETURN_GENERATED_KEYS
                );

                ps.setLong(1, itinerary.getUser().getId());
                ps.setString(2, itinerary.getTitle());
                ps.setInt(
                        3,
                        itinerary.getTotalPeople() == null
                                ? 1
                                : itinerary.getTotalPeople()
                );

                LocalDateTime createdAt = itinerary.getCreatedAt() == null
                        ? LocalDateTime.now()
                        : itinerary.getCreatedAt();

                ps.setTimestamp(4, Timestamp.valueOf(createdAt));

                return ps;
            }, keyHolder);

            Number key = keyHolder.getKey();

            if (key != null) {
                itinerary.setId(key.longValue());
            }

            return findById(itinerary.getId()).orElse(itinerary);
        }

        String sql = """
                UPDATE itinerary
                SET title = ?, total_people = ?
                WHERE id = ?
                """;

        jdbcTemplate.update(
                sql,
                itinerary.getTitle(),
                itinerary.getTotalPeople() == null
                        ? 1
                        : itinerary.getTotalPeople(),
                itinerary.getId()
        );

        return findById(itinerary.getId()).orElse(itinerary);
    }

    public void deleteById(Long id) {
        jdbcTemplate.update(
                "DELETE FROM itinerary_item WHERE itinerary_id = ?",
                id
        );

        jdbcTemplate.update(
                "DELETE FROM itinerary WHERE id = ?",
                id
        );
    }
}