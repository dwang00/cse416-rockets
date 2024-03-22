package com.example.java_stuff.stateAssemblyRaceData;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StateAssemblyRaceService {
    private final StateAssemblyRaceRepository stateAssemblyRaceRepository;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public StateAssemblyRaceService(StateAssemblyRaceRepository stateAssemblyRaceRepository) {
        this.stateAssemblyRaceRepository = stateAssemblyRaceRepository;
    }

    public List<RaceData> getAllStateAssemblyRaceData() {
        return stateAssemblyRaceRepository.findAll();
    }

    public List<RaceData> getStateAssemblyRaceDataByState(String state) {
        return stateAssemblyRaceRepository.findByState(state);
    }


}
