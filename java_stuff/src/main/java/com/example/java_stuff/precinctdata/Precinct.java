package com.example.java_stuff.precinctdata;


import com.example.java_stuff.enums.State;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("precinctData")
public class Precinct {
    @Id
    private String id;

    @Field("DISTRICT")
    private int districtNum;

    @Field("state")
    private State state;

    @Field("POPULATION")
    private int totalPop;

    @Field("ETH1_AA")
    private int minorityPop;

    @Field("PARTY_DEM")
    private int demoVotes;

    @Field("PARTY_REP")
    private int repubVotes;

    public Precinct(String id, int districtNum, State state, int totalPop, int minorityPop, int demoVotes, int repubVotes) {
        this.id = id;
        this.districtNum = districtNum;
        this.state = state;
        this.totalPop = totalPop;
        this.minorityPop = minorityPop;
        this.demoVotes = demoVotes;
        this.repubVotes = repubVotes;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public int getTotalPop() {
        return totalPop;
    }

    public void setTotalPop(int totalPop) {
        this.totalPop = totalPop;
    }

    public int getMinorityPop() {
        return minorityPop;
    }

    public void setMinorityPop(int minorityPop) {
        this.minorityPop = minorityPop;
    }

    public int getDemoVotes() {
        return demoVotes;
    }

    public void setDemoVotes(int demoVotes) {
        this.demoVotes = demoVotes;
    }

    public int getRepubVotes() {
        return repubVotes;
    }

    public void setRepubVotes(int repubVotes) {
        this.repubVotes = repubVotes;
    }
}
