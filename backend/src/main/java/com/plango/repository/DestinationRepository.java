package com.plango.repository;

import com.plango.entity.Destination;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class DestinationRepository {

    private final JdbcTemplate jdbcTemplate;

    public DestinationRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Destination> mapper = (rs, rowNum) -> {
        Destination destination = new Destination();
        destination.setId(rs.getLong("id"));
        destination.setName(rs.getString("name"));
        destination.setLocation(rs.getString("location"));
        destination.setCategory(rs.getString("category"));
        destination.setDescription(rs.getString("description"));
        destination.setPrice(rs.getDouble("price"));
        destination.setImageUrl(rs.getString("image_url"));
        destination.setLatitude(rs.getDouble("latitude"));
        destination.setLongitude(rs.getDouble("longitude"));
        return destination;
    };

    public List<Destination> findAll() {
        return jdbcTemplate.query("SELECT * FROM destination", mapper);
    }

    public Optional<Destination> findById(Long id) {
        try {
            Destination destination = jdbcTemplate.queryForObject(
                    "SELECT * FROM destination WHERE id = ?",
                    mapper,
                    id
            );
            return Optional.ofNullable(destination);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }
}