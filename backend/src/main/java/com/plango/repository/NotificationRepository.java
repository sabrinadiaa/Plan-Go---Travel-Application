package com.plango.repository;

import com.plango.entity.Notification;
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
public class NotificationRepository {

    private final JdbcTemplate jdbcTemplate;
    private final UserRepository userRepository;

    public NotificationRepository(
            JdbcTemplate jdbcTemplate,
            UserRepository userRepository
    ) {
        this.jdbcTemplate = jdbcTemplate;
        this.userRepository = userRepository;
    }

    private Notification mapNotification(java.sql.ResultSet rs) throws java.sql.SQLException {
        Notification notification = new Notification();

        notification.setId(rs.getLong("id"));
        notification.setTitle(rs.getString("title"));
        notification.setMessage(rs.getString("message"));
        notification.setIsRead(rs.getBoolean("is_read"));

        Timestamp createdAt = rs.getTimestamp("created_at");
        notification.setCreatedAt(createdAt != null ? createdAt.toLocalDateTime() : null);

        Optional<User> user = userRepository.findById(rs.getLong("user_id"));
        user.ifPresent(notification::setUser);

        return notification;
    }

    public List<Notification> findAll() {
        return jdbcTemplate.query(
                "SELECT * FROM notification",
                (rs, rowNum) -> mapNotification(rs)
        );
    }

    public Optional<Notification> findById(Long id) {
        try {
            Notification notification = jdbcTemplate.queryForObject(
                    "SELECT * FROM notification WHERE id = ?",
                    (rs, rowNum) -> mapNotification(rs),
                    id
            );
            return Optional.ofNullable(notification);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public List<Notification> findByUserId(Long userId) {
        return jdbcTemplate.query(
                "SELECT * FROM notification WHERE user_id = ?",
                (rs, rowNum) -> mapNotification(rs),
                userId
        );
    }

    public Notification save(Notification notification) {
        if (notification.getId() == null) {
            String sql = """
                    INSERT INTO notification 
                    (user_id, title, message, is_read, created_at) 
                    VALUES (?, ?, ?, ?, ?)
                    """;

            KeyHolder keyHolder = new GeneratedKeyHolder();

            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setLong(1, notification.getUser().getId());
                ps.setString(2, notification.getTitle());
                ps.setString(3, notification.getMessage());
                ps.setBoolean(4, notification.getIsRead() != null && notification.getIsRead());
                ps.setTimestamp(5, Timestamp.valueOf(
                        notification.getCreatedAt() == null ? LocalDateTime.now() : notification.getCreatedAt()
                ));
                return ps;
            }, keyHolder);

            notification.setId(keyHolder.getKey().longValue());
        } else {
            jdbcTemplate.update(
                    "UPDATE notification SET title = ?, message = ?, is_read = ? WHERE id = ?",
                    notification.getTitle(),
                    notification.getMessage(),
                    notification.getIsRead(),
                    notification.getId()
            );
        }

        return notification;
    }

    public void updateReadStatus(Long id, Boolean isRead) {
        jdbcTemplate.update(
                "UPDATE notification SET is_read = ? WHERE id = ?",
                isRead,
                id
        );
    }
}