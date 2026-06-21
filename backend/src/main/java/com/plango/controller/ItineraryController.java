package com.plango.controller;

import com.plango.dto.itinerary.AddDestinationRequest;
import com.plango.dto.itinerary.CreateItineraryRequest;
import com.plango.entity.Destination;
import com.plango.entity.Itinerary;
import com.plango.entity.ItineraryItem;
import com.plango.entity.User;
import com.plango.repository.DestinationRepository;
import com.plango.repository.ItineraryItemRepository;
import com.plango.repository.ItineraryRepository;
import com.plango.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/user/{userId}")
    public List<Itinerary> getByUserId(@PathVariable Long userId) {
        return itineraryRepository.findByUserId(userId);
    }

    @PostMapping
    public Itinerary create(@RequestBody CreateItineraryRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        Itinerary itinerary = new Itinerary();

        itinerary.setTitle(request.getTitle());
        itinerary.setTotalPeople(request.getTotalPeople());
        itinerary.setUser(user);
        itinerary.setCreatedAt(LocalDateTime.now());

        return itineraryRepository.save(itinerary);
    }

    @GetMapping("/{id}")
    public Itinerary getById(@PathVariable Long id) {
        return itineraryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Itinerary tidak ditemukan"));
    }

    @PutMapping("/{id}")
    public Itinerary update(
            @PathVariable Long id,
            @RequestBody CreateItineraryRequest request
    ) {
        Itinerary itinerary = itineraryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Itinerary tidak ditemukan"));

        itinerary.setTitle(request.getTitle());
        itinerary.setTotalPeople(request.getTotalPeople());

        return itineraryRepository.save(itinerary);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        itineraryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Itinerary tidak ditemukan"));

        itineraryRepository.deleteById(id);

        return "Itinerary berhasil dihapus";
    }

    @PostMapping("/{id}/destination")
    public ItineraryItem addDestination(
            @PathVariable Long id,
            @RequestBody AddDestinationRequest request
    ) {
        Itinerary itinerary = itineraryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Itinerary tidak ditemukan"));

        Destination destination = destinationRepository.findById(request.getDestinationId())
                .orElseThrow(() -> new RuntimeException("Destination tidak ditemukan"));

        ItineraryItem item = new ItineraryItem();

        item.setItinerary(itinerary);
        item.setDestination(destination);
        item.setVisitTime(LocalDateTime.now());

        return itineraryItemRepository.save(item);
    }

    @DeleteMapping("/item/{itemId}")
    public String deleteItineraryItem(@PathVariable Long itemId) {
        itineraryItemRepository.deleteById(itemId);
        return "Destination berhasil dihapus dari itinerary";
    }

    @PutMapping("/item/{itemId}/visit-time")
    public String updateVisitTime(
            @PathVariable Long itemId,
            @RequestBody Map<String, String> request
    ) {
        String visitTimeString = request.get("visitTime");

        if (visitTimeString == null || visitTimeString.isEmpty()) {
            return "Visit time tidak boleh kosong";
        }

        LocalDateTime visitTime = LocalDateTime.parse(visitTimeString);

        itineraryItemRepository.updateVisitTime(itemId, visitTime);

        return "Jam kunjung berhasil diupdate";
    }
}