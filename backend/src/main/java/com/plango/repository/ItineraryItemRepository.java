package com.plango.repository;

import com.plango.entity.Destination;
import com.plango.entity.Itinerary;
import com.plango.entity.ItineraryItem;
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
public class ItineraryItemRepository {

    private final JdbcTemplate jdbcTemplate;
    private final DestinationRepository destinationRepository;

    public ItineraryItemRepository(
            JdbcTemplate jdbcTemplate,
            DestinationRepository destinationRepository
    ) {
        this.jdbcTemplate = jdbcTemplate;
        this.destinationRepository = destinationRepository;
    }

    private ItineraryItem mapItem(java.sql.ResultSet rs) throws java.sql.SQLException {
        ItineraryItem item = new ItineraryItem();

        item.setId(rs.getLong("id"));

        Timestamp visitTime = rs.getTimestamp("visit_time");
        item.setVisitTime(visitTime != null ? visitTime.toLocalDateTime() : null);

        Itinerary itinerary = new Itinerary();
        itinerary.setId(rs.getLong("itinerary_id"));
        item.setItinerary(itinerary);

        Long destinationId = rs.getLong("destination_id");
        Optional<Destination> destination = destinationRepository.findById(destinationId);
        destination.ifPresent(item::setDestination);

        return item;
    }

    public List<ItineraryItem> findAll() {
        return jdbcTemplate.query(
                "SELECT * FROM itinerary_item",
                (rs, rowNum) -> mapItem(rs)
        );
    }

    public Optional<ItineraryItem> findById(Long id) {
        try {
            ItineraryItem item = jdbcTemplate.queryForObject(
                    "SELECT * FROM itinerary_item WHERE id = ?",
                    (rs, rowNum) -> mapItem(rs),
                    id
            );
            return Optional.ofNullable(item);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public List<ItineraryItem> findByItineraryId(Long itineraryId) {
        return jdbcTemplate.query(
                "SELECT * FROM itinerary_item WHERE itinerary_id = ?",
                (rs, rowNum) -> mapItem(rs),
                itineraryId
        );
    }

    public ItineraryItem save(ItineraryItem item) {
        if (item.getId() == null) {
            String sql = "INSERT INTO itinerary_item (itinerary_id, destination_id, visit_time) VALUES (?, ?, ?)";

            KeyHolder keyHolder = new GeneratedKeyHolder();

            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setLong(1, item.getItinerary().getId());
                ps.setLong(2, item.getDestination().getId());
                ps.setTimestamp(3, Timestamp.valueOf(
                        item.getVisitTime() == null ? LocalDateTime.now() : item.getVisitTime()
                ));
                return ps;
            }, keyHolder);

            item.setId(keyHolder.getKey().longValue());
        } else {
            jdbcTemplate.update(
                    "UPDATE itinerary_item SET visit_time = ? WHERE id = ?",
                    Timestamp.valueOf(item.getVisitTime()),
                    item.getId()
            );
        }

        return item;
    }

    public void deleteById(Long id) {
        jdbcTemplate.update("DELETE FROM itinerary_item WHERE id = ?", id);
    }

    public void updateVisitTime(Long itemId, LocalDateTime visitTime) {
        String sql = "UPDATE itinerary_item SET visit_time = ? WHERE id = ?";

        jdbcTemplate.update(
                sql,
                Timestamp.valueOf(visitTime),
                itemId
        );
        }
}