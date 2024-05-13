package com.example.java_stuff.oppdist;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import com.example.java_stuff.enums.*;

@Document("opportunityDistrictMaps")
public class OppDistMap {
    @Id
    private String id;

    @Field("state")
    private State state;

    @Field("ensemble")
    private int ensemble;

    @Field("threshold")
    private String threshold;

    @Field("type")
    private String type;

    @Field("crs")
    private Object crs;

    @Field("features")
    private Object features;

    public OppDistMap(String id, State state, int ensemble, String threshold, String type, Object crs, Object features) {
        this.id = id;
        this.state = state;
        this.ensemble = ensemble;
        this.threshold = threshold;
        this.type = type;
        this.crs = crs;
        this.features = features;
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

    public int getEnsemble() {
        return ensemble;
    }

    public void setEnsemble(int ensemble) {
        this.ensemble = ensemble;
    }

    public String getThreshold() {
        return threshold;
    }

    public void setThreshold(String threshold) {
        this.threshold = threshold;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Object getCrs() {
        return crs;
    }

    public void setCrs(Object crs) {
        this.crs = crs;
    }

    public Object getFeatures() {
        return features;
    }

    public void setFeatures(Object features) {
        this.features = features;
    }
}
