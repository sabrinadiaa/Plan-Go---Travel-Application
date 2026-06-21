package com.plango.repository;

import com.plango.entity.User;
import com.plango.entity.UserPreference;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Repository
public class UserPreferenceRepository {

    private final JdbcTemplate jdbcTemplate;
    private final UserRepository userRepository;

    public UserPreferenceRepository(
            JdbcTemplate jdbcTemplate,
            UserRepository userRepository
    ) {
        this.jdbcTemplate = jdbcTemplate;
        this.userRepository = userRepository;
    }

    private UserPreference mapPreference(java.sql.ResultSet rs) throws java.sql.SQLException {
        UserPreference preference = new UserPreference();

        preference.setId(rs.getLong("id"));
        preference.setPreferenceType(rs.getString("preference_type"));
        preference.setPreferenceValue(rs.getString("preference_value"));

        Optional<User> user = userRepository.findById(rs.getLong("user_id"));
        user.ifPresent(preference::setUser);

        return preference;
    }

    public List<UserPreference> findAll() {
        return jdbcTemplate.query(
                "SELECT * FROM user_preferences",
                (rs, rowNum) -> mapPreference(rs)
        );
    }

    public Optional<UserPreference> findById(Long id) {
        try {
            UserPreference preference = jdbcTemplate.queryForObject(
                    "SELECT * FROM user_preferences WHERE id = ?",
                    (rs, rowNum) -> mapPreference(rs),
                    id
            );
            return Optional.ofNullable(preference);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public List<UserPreference> findByUserId(Long userId) {
        return jdbcTemplate.query(
                "SELECT * FROM user_preferences WHERE user_id = ?",
                (rs, rowNum) -> mapPreference(rs),
                userId
        );
    }

    public UserPreference save(UserPreference preference) {
        if (preference.getId() == null) {
            String sql = """
                    INSERT INTO user_preferences 
                    (user_id, preference_type, preference_value) 
                    VALUES (?, ?, ?)
                    """;

            KeyHolder keyHolder = new GeneratedKeyHolder();

            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setLong(1, preference.getUser().getId());
                ps.setString(2, preference.getPreferenceType());
                ps.setString(3, preference.getPreferenceValue());
                return ps;
            }, keyHolder);

            preference.setId(keyHolder.getKey().longValue());
        } else {
            jdbcTemplate.update(
                    "UPDATE user_preferences SET preference_type = ?, preference_value = ? WHERE id = ?",
                    preference.getPreferenceType(),
                    preference.getPreferenceValue(),
                    preference.getId()
            );
        }

        return preference;
    }
}