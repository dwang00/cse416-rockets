package com.example.java_stuff.gingles2;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.List;


@Document("gingles2")
public class gingles2Data {
    @Id
    private String id;

    @Field("dataPoints")
    private List<DataPoint> dataPoints;

    private String state;

    public gingles2Data(String id, List<DataPoint> dataPoints, String state) {
        this.id = id;
        this.dataPoints = dataPoints;
        this.state = state;
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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
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