package com.example.java_stuff.oppdist;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import com.example.java_stuff.enums.*;

@Document("opportunityDistrictData")
public class OppDistData {
    @Id
    private String id;

    @Field("state")
    private State state;

    @Field("idealpop")
    private int idealpop;

    @Field("totalpop")
    private int totalpop;

    @Field("maxoppdistricts_aa")
    private int maxoppdistricts_aa;

    @Field("maxoppdistricts_eur")
    private int maxoppdistricts_eur;

    public OppDistData(String id, State state, int idealpop, int totalpop, int maxoppdistricts_aa, int maxoppdistricts_eur) {
        this.id = id;
        this.state = state;
        this.idealpop = idealpop;
        this.totalpop = totalpop;
        this.maxoppdistricts_aa = maxoppdistricts_aa;
        this.maxoppdistricts_eur = maxoppdistricts_eur;
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

    public int getIdealpop() {
        return idealpop;
    }

    public void setIdealpop(int idealpop) {
        this.idealpop = idealpop;
    }

    public int getTotalpop() {
        return totalpop;
    }

    public void setTotalpop(int totalpop) {
        this.totalpop = totalpop;
    }

    public int getMaxoppdistricts_aa() {
        return maxoppdistricts_aa;
    }

    public void setMaxoppdistricts_aa(int maxoppdistricts_aa) {
        this.maxoppdistricts_aa = maxoppdistricts_aa;
    }

    public int getMaxoppdistricts_eur() {
        return maxoppdistricts_eur;
    }

    public void setMaxoppdistricts_eur(int maxoppdistricts_eur) {
        this.maxoppdistricts_eur = maxoppdistricts_eur;
    }
}
