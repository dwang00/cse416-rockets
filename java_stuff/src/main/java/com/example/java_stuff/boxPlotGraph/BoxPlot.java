package com.example.java_stuff.boxPlotGraph;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("boxPlotData")
public class BoxPlot {
    @Id
    private String id;

    @Field("min")
    private double min;

    @Field("lower")
    private double lower;

    @Field("med")
    private double med;

    @Field("upper")
    private double upper;

    @Field("max")
    private double max;

    @Field("districtNum")
    private int districtNum;

    @Field("state")
    private State state;

    enum State {
        ALABAMA,
        DELAWARE
    }

    public BoxPlot(String id, double min, double lower, double med, double upper, double max, int districtNum, State state) {
        this.id = id;
        this.min = min;
        this.lower = lower;
        this.med = med;
        this.upper = upper;
        this.max = max;
        this.districtNum = districtNum;
        this.state = state;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getMin() {
        return min;
    }

    public void setMin(double min) {
        this.min = min;
    }

    public double getLower() {
        return lower;
    }

    public void setLower(double lower) {
        this.lower = lower;
    }

    public double getMed() {
        return med;
    }

    public void setMed(double med) {
        this.med = med;
    }

    public double getUpper() {
        return upper;
    }

    public void setUpper(double upper) {
        this.upper = upper;
    }

    public double getMax() {
        return max;
    }

    public void setMax(double max) {
        this.max = max;
    }

    public int getDistrictNum() {
        return districtNum;
    }

    public void setDistrictNum(int districtNum) {
        this.districtNum = districtNum;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }
}
