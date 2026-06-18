package com.plango.repository;

import com.plango.entity.Destination;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DestinationRepository {

    private final JdbcTemplate jdbcTemplate;

    public DestinationJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Destination> findAll() {
        String sql = "SELECT * FROM destination";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
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
        });
    }

    public Destination findById(Long id) {
        String sql = "SELECT * FROM destination WHERE id = ?";

        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
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
        }, id);
    }
}