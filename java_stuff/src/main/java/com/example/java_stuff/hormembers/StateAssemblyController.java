package com.example.java_stuff.hormembers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/get_members")
public class StateAssemblyController {
    private final StateAssemblyService stateAssemblyService;

    @Autowired
    public StateAssemblyController(StateAssemblyService stateAssemblyService) {
        this.stateAssemblyService = stateAssemblyService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/allMembers")
    public List<StateAssembly> getAllMembers() {
        return stateAssemblyService.getAllMembers();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/membersByState")
    public List<StateAssembly> getMembersByState(@RequestParam String state) {
        return stateAssemblyService.getMembersByState(state);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/membersByStateAndParty")
    public List<StateAssembly> getMembersByStateAndParty(@RequestParam String state, @RequestParam String party) {
        return stateAssemblyService.getMembersByStateAndParty(state, party);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/membersByStateAndRaces")
    public List<StateAssembly> getMembersByStateAndRaces(@RequestParam String state, @RequestParam List<String> races) {
        return stateAssemblyService.getMembersByStateAndRaces(state, races);
    }
}
