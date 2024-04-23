package com.example.java_stuff.gingles;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.List;


@Document("gingles")
public class GinglesData {
    @Id
    private String id;

    @Field("dataPoints")
    private List<DataPoint> dataPoints;

    @Field("state")
    private State state;
    enum State {
        ALABAMA,
        DELAWARE
    }

    @Field("party")
    private Party party;
    enum Party {
        DEMOCRAT,
        REPUBLICAN
    }

    @Field("race")
    private String race;

    @Field("func")
    private List<Double> function;

    public GinglesData(String id, List<DataPoint> dataPoints, State state, Party party, String race, List<Double> function) {
        this.id = id;
        this.dataPoints = dataPoints;
        this.state = state;
        this.party = party;
        this.race = race;
        this.function = function;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<DataPoint> getDataPoints() {
        return dataPoints;
    }

    public void setDataPoints(List<DataPoint> dataPoints) {
        this.dataPoints = dataPoints;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public Party getParty() {
        return party;
    }

    public void setParty(Party party) {
        this.party = party;
    }

    public String getRace() {
        return race;
    }

    public void setRace(String race) {
        this.race = race;
    }

    public List<Double> getFunction() {
        return function;
    }

    public void setFunction(List<Double> function) {
        this.function = function;
    }
}

class DataPoint {
    private double x;
    private double y;

    public DataPoint() {}

    public DataPoint(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }


}