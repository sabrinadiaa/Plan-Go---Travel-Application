package com.plango.repository;

import com.plango.entity.ItineraryItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItineraryItemRepository
        extends JpaRepository<ItineraryItem, Long> {
}