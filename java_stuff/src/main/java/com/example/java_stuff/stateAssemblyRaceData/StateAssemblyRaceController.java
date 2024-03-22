package com.example.java_stuff.stateAssemblyRaceData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/get_racedata")
public class StateAssemblyRaceController {
    private final StateAssemblyRaceService stateAssemblyRaceService;

    @Autowired
    public StateAssemblyRaceController(StateAssemblyRaceService stateAssemblyRaceService) {
        this.stateAssemblyRaceService = stateAssemblyRaceService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/all")
    public List<RaceData> getAllStateAssemblyRaceData() {
        return stateAssemblyRaceService.getAllStateAssemblyRaceData();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/by_state")
    public List<RaceData> getStateAssemblyRaceDataByState(@RequestParam String state) {
        return stateAssemblyRaceService.getStateAssemblyRaceDataByState(state);
    }
}
