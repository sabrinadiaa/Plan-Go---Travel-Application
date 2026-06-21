package com.plango.repository;

import com.plango.entity.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Optional<User> findByEmail(String email) {
        String sql = """
                SELECT id, username, email, password, saldo, role
                FROM users
                WHERE email = ?
                LIMIT 1
                """;

        return jdbcTemplate.query(sql, rs -> {
            if (rs.next()) {
                return Optional.of(mapUser(rs));
            }

            return Optional.empty();
        }, email);
    }

    public Optional<User> findById(Long id) {
        String sql = """
                SELECT id, username, email, password, saldo, role
                FROM users
                WHERE id = ?
                LIMIT 1
                """;

        return jdbcTemplate.query(sql, rs -> {
            if (rs.next()) {
                return Optional.of(mapUser(rs));
            }

            return Optional.empty();
        }, id);
    }

    public User save(User user) {
        String role = user.getRole();

        if (role == null || role.isBlank()) {
            role = "CUSTOMER";
        }

        String sql = """
                INSERT INTO users (username, email, password, saldo, role)
                VALUES (?, ?, ?, ?, ?)
                """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        String finalRole = role;

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                    sql,
                    Statement.RETURN_GENERATED_KEYS
            );

            ps.setString(1, user.getUsername());
            ps.setString(2, user.getEmail());
            ps.setString(3, user.getPassword());
            ps.setDouble(4, user.getSaldo() == null ? 0.0 : user.getSaldo());
            ps.setString(5, finalRole);

            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();

        if (key != null) {
            user.setId(key.longValue());
        }

        user.setRole(finalRole);

        return user;
    }

    private User mapUser(ResultSet rs) throws SQLException {
        User user = new User();

        user.setId(rs.getLong("id"));
        user.setUsername(rs.getString("username"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        user.setSaldo(rs.getDouble("saldo"));
        user.setRole(rs.getString("role"));

        return user;
    }
}