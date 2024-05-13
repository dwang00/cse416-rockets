package com.example.java_stuff.oppdist;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Service
public class OppDistMapService {
    private final OppDistMapRepository oppDistMapRepository;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public OppDistMapService(OppDistMapRepository oppDistMapRepository) {
        this.oppDistMapRepository = oppDistMapRepository;
    }

    public List<OppDistMap> getByState(String state) {
        return this.oppDistMapRepository.findByState(state);
    }
}
