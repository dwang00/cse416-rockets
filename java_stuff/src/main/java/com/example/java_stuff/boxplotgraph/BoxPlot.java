package com.example.java_stuff.boxplotgraph;

import com.example.java_stuff.enums.State;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("boxPlotData")
public class BoxPlot {
    @Id
    private String id;

    @Field("state")
    private State state;

    @Field("points")
    private Object points;

    @Field("black")
    private Object black;

    @Field("white")
    private Object white;

    @Field("democratic")
    private Object democratic;

    @Field("republican")
    private Object republican;

    public BoxPlot(String id, State state, Object points, Object black, Object white, Object democratic, Object republican) {
        this.id = id;
        this.state = state;
        this.points = points;
        this.black = black;
        this.white = white;
        this.democratic = democratic;
        this.republican = republican;
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

    public Object getPoints() {
        return points;
    }

    public void setPoints(Object points) {
        this.points = points;
    }

    public Object getBlack() {
        return black;
    }

    public void setBlack(Object black) {
        this.black = black;
    }

    public Object getWhite() {
        return white;
    }

    public void setWhite(Object white) {
        this.white = white;
    }

    public Object getDemocratic() {
        return democratic;
    }

    public void setDemocratic(Object democratic) {
        this.democratic = democratic;
    }

    public Object getRepublican() {
        return republican;
    }

    public void setRepublican(Object republican) {
        this.republican = republican;
    }
}
