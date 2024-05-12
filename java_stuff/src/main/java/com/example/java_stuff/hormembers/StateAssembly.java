package com.example.java_stuff.hormembers;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.List;
import com.example.java_stuff.enums.*;

@Document("stateAssemblyMembers")
public class StateAssembly {

    @Id
    private String id;
    @Field("name")
    private String name;
    @Field("district")
    private int district;
    @Field("img")
    private String img;
    @Field("races")
    private List<String> races;
    @Field("party")
    private Party party;
    @Field("state")
    private State state;
    @Field("margin")
    private double margin;

    public StateAssembly() {
    }

    public StateAssembly(String id, String name, int district, String img, List<String> races, Party party, State state, double margin) {
        this.id = id;
        this.name = name;
        this.district = district;
        this.img = img;
        this.races = races;
        this.party = party;
        this.state = state;
        this.margin = margin;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getDistrict() {
        return district;
    }

    public void setDistrict(int district) {
        this.district = district;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public List<String> getRaces() {
        return races;
    }

    public void setRaces(List<String> races) {
        this.races = races;
    }

    public Party getParty() {
        return party;
    }

    public void setParty(Party party) {
        this.party = party;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public double getMargin() {
        return margin;
    }

    public void setMargin(double margin) {
        this.margin = margin;
    }
}
