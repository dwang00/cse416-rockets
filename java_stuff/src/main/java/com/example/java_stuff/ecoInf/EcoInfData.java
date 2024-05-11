package com.example.java_stuff.ecoInf;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.List;
import com.example.java_stuff.enums.*;

@Document("ecoInfData")
public class EcoInfData {
    @Id
    private String id;

    @Field("state")
    private State state;

    @Field("candidate")
    private String candidate;

    @Field("data")
    private List<Double> data;

    @Field("race")
    private String race;

    @Field("election")
    private String election;

    public EcoInfData() {

    }

    public EcoInfData(String id, State state, String candidate, List<Double> data, String race, String election) {
        this.id = id;
        this.state = state;
        this.candidate = candidate;
        this.data = data;
        this.race = race;
        this.election = election;
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

    public String getCandidate() {
        return candidate;
    }

    public void setCandidate(String candidate) {
        this.candidate = candidate;
    }

    public List<Double> getData() {
        return data;
    }

    public void setData(List<Double> data) {
        this.data = data;
    }

    public String getRace() {
        return race;
    }

    public void setRace(String race) {
        this.race = race;
    }

    public String getElection() {
        return election;
    }

    public void setElection(String election) {
        this.election = election;
    }
}
