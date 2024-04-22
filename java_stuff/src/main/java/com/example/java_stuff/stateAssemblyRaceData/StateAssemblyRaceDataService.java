package com.example.java_stuff.stateAssemblyRaceData;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StateAssemblyRaceDataService {
    private final StateAssemblyRaceDataRepository stateAssemblyRaceRepository;

    private List<StateAssemblyRaceData> allStateAssemblyRaceData;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public StateAssemblyRaceDataService(StateAssemblyRaceDataRepository stateAssemblyRaceRepository) {
        this.stateAssemblyRaceRepository = stateAssemblyRaceRepository;
    }

    public List<StateAssemblyRaceData> getAllStateAssemblyRaceData() {
        if(allStateAssemblyRaceData == null) {
            allStateAssemblyRaceData = stateAssemblyRaceRepository.findAll();
        }
        return allStateAssemblyRaceData;
    }

    public List<StateAssemblyRaceData> getStateAssemblyRaceDataByState(StateAssemblyRaceData.State state) {
        return stateAssemblyRaceRepository.findByState(state);
    }


}
