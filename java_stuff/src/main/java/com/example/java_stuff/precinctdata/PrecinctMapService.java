package com.example.java_stuff.precinctdata;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrecinctMapService {
    private final PrecinctMapRepository precinctMapRepository;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public PrecinctMapService(PrecinctMapRepository precinctMapRepository) {
        this.precinctMapRepository = precinctMapRepository;
    }

    public PrecinctMap getByState(String state) {
        return this.precinctMapRepository.findByState(state);
    }
}
