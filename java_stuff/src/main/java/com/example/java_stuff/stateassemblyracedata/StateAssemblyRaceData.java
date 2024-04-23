package com.example.java_stuff.stateassemblyracedata;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import com.example.java_stuff.enums.State;

@Document("stateAssemblyRaceData")
public class StateAssemblyRaceData {

    @Id
    private String id;

    @Field("state")
    private State state;

    @Field("raceCount")
    private RaceCount raceCount;

    public StateAssemblyRaceData(String id, State state, RaceCount raceCount) {
        this.id = id;
        this.state = state;
        this.raceCount = raceCount;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public RaceCount getRaceCount() {
        return raceCount;
    }

    public void setRaceCount(RaceCount raceCount) {
        this.raceCount = raceCount;
    }
}

