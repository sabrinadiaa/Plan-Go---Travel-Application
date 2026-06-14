package com.plango.repository;

import com.plango.entity.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItineraryRepository
        extends JpaRepository<Itinerary, Long> {
}