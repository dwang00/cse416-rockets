package com.example.java_stuff.oppdist;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Service
public class OppDistBinsService {
    private final OppDistBinsRepository oppDistBinsRepository;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public OppDistBinsService(OppDistBinsRepository oppDistBinsRepository) {
        this.oppDistBinsRepository = oppDistBinsRepository;
    }

    public List<OppDistBins> getByState(String state) {
        return this.oppDistBinsRepository.findByState(state);
    }
}
