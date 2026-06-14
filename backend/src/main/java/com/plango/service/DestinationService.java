package com.plango.service;

import com.plango.entity.Destination;
import com.plango.repository.DestinationRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DestinationService {

    private final DestinationRepository repository;

    // Constructor manual menggantikan @RequiredArgsConstructor
    public DestinationService(DestinationRepository repository) {
        this.repository = repository;
    }

    public List<Destination> getAll(){
        return repository.findAll();
    }

    public Destination getById(Long id){
        return repository.findById(id).orElse(null);
    }
}