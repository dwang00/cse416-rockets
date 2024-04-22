package com.example.java_stuff.horMembers;

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
    @GetMapping("/membersByRaces")
    public List<StateAssembly> getMembersByRaces(@RequestParam List<String> races) {
        return stateAssemblyService.getMembersByRaces(races);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/membersByParty")
    public List<StateAssembly> getMembersByParty(@RequestParam StateAssembly.Party party) {
        return stateAssemblyService.getMembersByParty(party);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/membersByState")
    public List<StateAssembly> getMembersByState(@RequestParam String state) {
        return stateAssemblyService.getMembersByState(state);
    }
}
