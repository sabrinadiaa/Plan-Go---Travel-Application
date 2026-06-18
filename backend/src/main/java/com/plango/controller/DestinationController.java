package com.plango.controller;

import com.plango.entity.Destination;
import com.plango.repository.DestinationJdbcRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destination")
@CrossOrigin(origins = "http://localhost:5173")
public class DestinationController {

    private final DestinationJdbcRepository destinationRepository;

    public DestinationController(DestinationJdbcRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    @GetMapping
    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    @GetMapping("/{id}")
    public Destination getDestinationById(@PathVariable Long id) {
        return destinationRepository.findById(id);
    }
}