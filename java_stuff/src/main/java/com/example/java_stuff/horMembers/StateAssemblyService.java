package com.example.java_stuff.horMembers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StateAssemblyService {
    private final StateAssemblyRepository stateAssemblyRepository;

    private List<StateAssembly> allStateAssemblyData;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public StateAssemblyService(StateAssemblyRepository memberRepository) {
        this.stateAssemblyRepository = memberRepository;
    }

    public List<StateAssembly> getAllMembers() {
        if(allStateAssemblyData == null) {
            allStateAssemblyData = stateAssemblyRepository.findAll();
        }
        return allStateAssemblyData;
    }

    public List<StateAssembly> getMembersByRaces(List<String> races) {
        if(allStateAssemblyData == null) {
            allStateAssemblyData = stateAssemblyRepository.findAll();
        }
        List<StateAssembly> membersWithMatchingRace = new ArrayList<>();
        for (StateAssembly member : allStateAssemblyData) {
            for (String race : races) {
                if (member.getRaces().contains(race)) {
                    membersWithMatchingRace.add(member);
                    break; // Once one matching race is found, no need to check further races for this member
                }
            }
        }
        return membersWithMatchingRace;
    }

    public List<StateAssembly> getMembersByParty(StateAssembly.Party party) {
        if(allStateAssemblyData == null) {
            allStateAssemblyData = stateAssemblyRepository.findAll();
        }
        List<StateAssembly> membersWithMatchingParty = new ArrayList<>();
        for (StateAssembly member : allStateAssemblyData) {
            if (member.getParty() == party) {
                membersWithMatchingParty.add(member);
            }
        }
        return membersWithMatchingParty;
    }

    public List<StateAssembly> getMembersByState(String state) {
        if(allStateAssemblyData == null) {
            allStateAssemblyData = stateAssemblyRepository.findAll();
        }
        List<StateAssembly> membersInState = new ArrayList<>();
        for (StateAssembly member : allStateAssemblyData) {
            if (member.getState().toString().equals(state)) {
                membersInState.add(member);
            }
        }
        return membersInState;
    }
}
