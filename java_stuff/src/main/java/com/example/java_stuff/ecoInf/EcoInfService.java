package com.example.java_stuff.ecoInf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EcoInfService {
    private final EcoInfRepository ecoInfRepository;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public EcoInfService(EcoInfRepository ecoInfRepository) {
        this.ecoInfRepository = ecoInfRepository;
    }

    public List<EcoInfData> getByElection(String election) {
        return ecoInfRepository.findByElection(election);
    }
    public List<EcoInfData> getByState(String state) {
        return ecoInfRepository.findByState(state);
    }
}
