package com.example.java_stuff.precinctdata;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PrecinctService {
    private final PrecinctRepository precinctRepository;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public PrecinctService(PrecinctRepository precinctRepository) {
        this.precinctRepository = precinctRepository;
    }

    public List<Precinct> getPrecinctsByState(String state) {
        return this.precinctRepository.findByState(state);
    }
}
