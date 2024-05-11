package com.example.java_stuff.gingles;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GinglesService {
    private final GinglesRepository ginglesRepository;
    private List<GinglesData> allGinglesData;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public GinglesService(GinglesRepository ginglesRepository) {
        this.ginglesRepository = ginglesRepository;
    }

    public List<GinglesData> getAllData() {
        if(allGinglesData == null) {
            allGinglesData = ginglesRepository.findAll();
        }
        return allGinglesData;
    }

    public List<GinglesData> getGinglesByState(String state) {
        List<GinglesData> stateData;

        stateData = ginglesRepository.findByState(state);
        return stateData;
    }
}
