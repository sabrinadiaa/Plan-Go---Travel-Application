package com.plango.repository;

import com.plango.entity.EmergencyContact;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Repository
public class EmergencyContactRepository {

    private final JdbcTemplate jdbcTemplate;

    public EmergencyContactRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<EmergencyContact> mapper = (rs, rowNum) -> {
        EmergencyContact contact = new EmergencyContact();
        contact.setId(rs.getLong("id"));
        contact.setName(rs.getString("name"));
        contact.setPhone(rs.getString("phone"));
        contact.setCategory(rs.getString("category"));
        contact.setLocation(rs.getString("location"));
        return contact;
    };

    public List<EmergencyContact> findAll() {
        return jdbcTemplate.query("SELECT * FROM emergency_contact", mapper);
    }

    public Optional<EmergencyContact> findById(Long id) {
        try {
            EmergencyContact contact = jdbcTemplate.queryForObject(
                    "SELECT * FROM emergency_contact WHERE id = ?",
                    mapper,
                    id
            );
            return Optional.ofNullable(contact);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public EmergencyContact save(EmergencyContact contact) {
        if (contact.getId() == null) {
            String sql = "INSERT INTO emergency_contact (name, phone, category, location) VALUES (?, ?, ?, ?)";

            KeyHolder keyHolder = new GeneratedKeyHolder();

            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, contact.getName());
                ps.setString(2, contact.getPhone());
                ps.setString(3, contact.getCategory());
                ps.setString(4, contact.getLocation());
                return ps;
            }, keyHolder);

            contact.setId(keyHolder.getKey().longValue());
        } else {
            jdbcTemplate.update(
                    "UPDATE emergency_contact SET name = ?, phone = ?, category = ?, location = ? WHERE id = ?",
                    contact.getName(),
                    contact.getPhone(),
                    contact.getCategory(),
                    contact.getLocation(),
                    contact.getId()
            );
        }

        return contact;
    }
}