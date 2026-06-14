package com.plango.controller;

import com.plango.dto.itinerary.AddDestinationRequest;
import com.plango.entity.ItineraryItem;
import com.plango.entity.Destination;

import com.plango.repository.ItineraryItemRepository;
import com.plango.repository.DestinationRepository;

import com.plango.dto.itinerary.CreateItineraryRequest;
import com.plango.entity.Itinerary;
import com.plango.entity.User;
import com.plango.repository.ItineraryRepository;
import com.plango.repository.UserRepository;

import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/itinerary")


public class ItineraryController {

    private final DestinationRepository destinationRepository;
    private final ItineraryItemRepository itineraryItemRepository;

    private final ItineraryRepository itineraryRepository;
    private final UserRepository userRepository;

    public ItineraryController(
        ItineraryRepository itineraryRepository,
        UserRepository userRepository,
        DestinationRepository destinationRepository,
        ItineraryItemRepository itineraryItemRepository
    ) {
        this.itineraryRepository = itineraryRepository;
        this.userRepository = userRepository;
        this.destinationRepository = destinationRepository;
        this.itineraryItemRepository = itineraryItemRepository;
    }

    @GetMapping
    public List<Itinerary> getAll() {
        return itineraryRepository.findAll();
    }

    @PostMapping
    public String create(
            @RequestBody CreateItineraryRequest request
    ) {

        User user =
                userRepository.findById(request.getUserId())
                        .orElse(null);

        if(user == null){
            return "User tidak ditemukan";
        }

        Itinerary itinerary = new Itinerary();

        itinerary.setTitle(request.getTitle());
        itinerary.setTotalPeople(
                request.getTotalPeople()
        );

        itinerary.setUser(user);

        itineraryRepository.save(itinerary);

        return "Itinerary berhasil dibuat";
    }

    @GetMapping("/{id}")
    public Itinerary getById(
            @PathVariable Long id
    ) {

        return itineraryRepository
                .findById(id)
                .orElse(null);
    }

    @PutMapping("/{id}")
    public String update(
            @PathVariable Long id,
            @RequestBody CreateItineraryRequest request
    ) {

        Itinerary itinerary =
                itineraryRepository.findById(id)
                        .orElse(null);

        if(itinerary == null){
            return "Itinerary tidak ditemukan";
        }

        itinerary.setTitle(request.getTitle());
        itinerary.setTotalPeople(
                request.getTotalPeople()
        );

        itineraryRepository.save(itinerary);

        return "Itinerary berhasil diupdate";
    }

    @DeleteMapping("/{id}")
    public String delete(   
            @PathVariable Long id
    ) {

        Itinerary itinerary =
                itineraryRepository.findById(id)
                        .orElse(null);

        if(itinerary == null){
            return "Itinerary tidak ditemukan";
        }

        itineraryRepository.delete(itinerary);

        return "Itinerary berhasil dihapus";
    }

        @PostMapping("/{id}/destination")
    public String addDestination(
            @PathVariable Long id,
            @RequestBody AddDestinationRequest request
    ) {

        Itinerary itinerary =
                itineraryRepository.findById(id)
                        .orElse(null);

        if(itinerary == null){
            return "Itinerary tidak ditemukan";
        }

        Destination destination =
                destinationRepository
                        .findById(request.getDestinationId())
                        .orElse(null);

        if(destination == null){
            return "Destination tidak ditemukan";
        }

        ItineraryItem item = new ItineraryItem();

        item.setItinerary(itinerary);
        item.setDestination(destination);

        itineraryItemRepository.save(item);

        return "Destination berhasil ditambahkan ke itinerary";
    }
}