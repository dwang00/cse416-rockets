package com.example.java_stuff.statesummary;

import com.example.java_stuff.stateassemblyracedata.RaceCount;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import com.example.java_stuff.enums.State;

@Document("stateSummary")
public class StateSummary {
    @Id
    private String id;
    @Field("state")
    private State state;
    @Field("statePopulation")
    private int statePopulation;
    @Field("voterDistribution")
    private Object voterDistribution;
    @Field("caucasianPop")
    private int caucasianPop;
    @Field("africanAmericanPop")
    private int africanAmericanPop;
    @Field("stateRepsPartyDistribution")
    private Object stateRepsPartyDistribution;
    @Field("stateRepsRaceDistribution")
    private Object stateRepsRaceDistribution;

    public StateSummary(String id, State state, int statePopulation, Object voterDistribution,
                        int caucasianPop, int africanAmericanPop, Object stateRepsPartyDistribution,
                        Object stateRepsRaceDistribution) {
        this.id = id;
        this.state = state;
        this.statePopulation = statePopulation;
        this.voterDistribution = voterDistribution;
        this.caucasianPop = caucasianPop;
        this.africanAmericanPop = africanAmericanPop;
        this.stateRepsPartyDistribution = stateRepsPartyDistribution;
        this.stateRepsRaceDistribution = stateRepsRaceDistribution;

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

    public int getStatePopulation() {
        return statePopulation;
    }

    public void setStatePopulation(int statePopulation) {
        this.statePopulation = statePopulation;
    }

    public Object getVoterDistribution() {
        return voterDistribution;
    }

    public void setVoterDistribution(Object voterDistribution) {
        this.voterDistribution = voterDistribution;
    }

    public int getCaucasianPop() {
        return caucasianPop;
    }

    public void setCaucasianPop(int caucasianPop) {
        this.caucasianPop = caucasianPop;
    }

    public int getAfricanAmericanPop() {
        return africanAmericanPop;
    }

    public void setAfricanAmericanPop(int africanAmericanPop) {
        this.africanAmericanPop = africanAmericanPop;
    }

    public Object getStateRepsPartyDistribution() {
        return stateRepsPartyDistribution;
    }

    public void setStateRepsPartyDistribution(Object stateRepsPartyDistribution) {
        this.stateRepsPartyDistribution = stateRepsPartyDistribution;
    }

    public Object getStateRepsRaceDistribution() {
        return stateRepsRaceDistribution;
    }

    public void setStateRepsRaceDistribution(Object stateRepsRaceDistribution) {
        this.stateRepsRaceDistribution = stateRepsRaceDistribution;
    }
}
class PartyDistribution {
    @Field("democrat")
    private int democrat;
    @Field("republican")
    private int republican;

    public PartyDistribution() {}
    public PartyDistribution(int democrat, int republican) {
        this.democrat = democrat;
        this.republican = republican;
    }

    public int getDemocrat() {
        return democrat;
    }

    public void setDemocrat(int democrat) {
        this.democrat = democrat;
    }

    public int getRepublican() {
        return republican;
    }

    public void setRepublican(int republican) {
        this.republican = republican;
    }
}