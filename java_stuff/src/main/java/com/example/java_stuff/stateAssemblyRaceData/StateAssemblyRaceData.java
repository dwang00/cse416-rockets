package com.example.java_stuff.stateAssemblyRaceData;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("stateAssemblyRaceData")
public class StateAssemblyRaceData {

    enum State {
        ALABAMA,
        DELAWARE
    }

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

class RaceCount {
    @Field("caucasian")
    private int caucasian;

    @Field("african_american")
    private int africanAmerican;

    @Field("asian")
    private int asian;

    public RaceCount() {

    }
    public RaceCount(int caucasian, int africanAmerican, int asian) {
        this.caucasian = caucasian;
        this.africanAmerican = africanAmerican;
        this.asian = asian;
    }

    public RaceCount(int caucasian, int africanAmerican) {
        this.caucasian = caucasian;
        this.africanAmerican = africanAmerican;
        // 'asian' field is not set
    }

    public int getCaucasian() {
        return caucasian;
    }

    public void setCaucasian(int caucasian) {
        this.caucasian = caucasian;
    }

    public int getAfricanAmerican() {
        return africanAmerican;
    }

    public void setAfricanAmerican(int africanAmerican) {
        this.africanAmerican = africanAmerican;
    }

    public int getAsian() {
        return asian;
    }

    public void setAsian(int asian) {
        this.asian = asian;
    }
}
