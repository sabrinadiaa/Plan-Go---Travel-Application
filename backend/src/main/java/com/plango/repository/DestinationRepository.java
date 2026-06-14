package com.plango.repository;

import com.plango.entity.Destination;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DestinationRepository
        extends JpaRepository<Destination, Long> {

    List<Destination> findByCategory(String category);

    List<Destination> findByNameContainingIgnoreCase(String keyword);
}