package com.plango.repository;

import com.plango.entity.UserPreference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPreferenceRepository
        extends JpaRepository<UserPreference, Long> {
}