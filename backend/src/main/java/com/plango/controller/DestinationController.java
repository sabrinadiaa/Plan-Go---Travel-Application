package com.plango.controller;

import com.plango.entity.Destination;
import com.plango.repository.DestinationRepository;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/destination")
public class DestinationController {

    private final DestinationRepository destinationRepository;

    public DestinationController(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    @GetMapping
    public List<Destination> getAll() {
        return destinationRepository.findAll();
    }
    @GetMapping("/{id}")
    public Destination getById(@PathVariable Long id) {
        return destinationRepository.findById(id).orElse(null);
    }
}