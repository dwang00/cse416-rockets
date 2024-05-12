package com.example.java_stuff.oppdist;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import com.example.java_stuff.enums.*;

@Document("opportunityDistrictBarChart")
public class OppDistBins {
    @Id
    private String id;

    @Field("state")
    private State state;

    @Field("ensemble")
    private int ensemble;

    @Field("t37")
    private Object t37;

    @Field("t5")
    private Object t5;

    @Field("t6")
    private Object t6;

    public OppDistBins(String id, State state, int ensemble, Object t37, Object t5, Object t6) {
        this.id = id;
        this.state = state;
        this.ensemble = ensemble;
        this.t37 = t37;
        this.t5 = t5;
        this.t6 = t6;
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

    public Object getT37() {
        return t37;
    }

    public void setT37(Object t37) {
        this.t37 = t37;
    }

    public Object getT5() {
        return t5;
    }

    public void setT5(Object t5) {
        this.t5 = t5;
    }

    public Object getT6() {
        return t6;
    }

    public void setT6(Object t6) {
        this.t6 = t6;
    }
}
