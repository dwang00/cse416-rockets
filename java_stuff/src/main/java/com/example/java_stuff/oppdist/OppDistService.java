package com.example.java_stuff.oppdist;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Service
public class OppDistService {
    private final OppDistRepository oppDistRepository;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public OppDistService(OppDistRepository oppDistRepository) {
        this.oppDistRepository = oppDistRepository;
    }

    public List<OppDistData> getByState(String state) {
        return this.oppDistRepository.findByState(state);
    }
}
