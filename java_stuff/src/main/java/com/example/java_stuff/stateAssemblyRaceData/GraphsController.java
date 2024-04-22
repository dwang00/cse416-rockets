package com.example.java_stuff.stateAssemblyRaceData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class GraphsController {
    private final StateAssemblyRaceDataService stateAssemblyRaceService;

    @Autowired
    public GraphsController(StateAssemblyRaceDataService stateAssemblyRaceService) {
        this.stateAssemblyRaceService = stateAssemblyRaceService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("get_racedata/all")
    public List<StateAssemblyRaceData> getAllStateAssemblyRaceData() {
        return stateAssemblyRaceService.getAllStateAssemblyRaceData();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("get_racedata/byState")
    public List<StateAssemblyRaceData> getStateAssemblyRaceDataByState(
            @RequestParam("state") StateAssemblyRaceData.State state) {
        return stateAssemblyRaceService.getStateAssemblyRaceDataByState(state);
    }

}
