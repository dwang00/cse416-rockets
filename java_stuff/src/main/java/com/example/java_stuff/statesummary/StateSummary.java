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
    private PartyDistribution voterDistribution;
    @Field("caucasianPop")
    private int caucasianPop;
    @Field("africanAmericanPop")
    private int africanAmericanPop;
    @Field("stateRepsPartyDistribution")
    private PartyDistribution stateRepsPartyDistribution;
    @Field("stateRepsRaceDistribution")
    private RaceCount stateRepsRaceDistribution;

    public StateSummary(String id, State state, int statePopulation, PartyDistribution voterDistribution,
                        int caucasianPop, int africanAmericanPop, PartyDistribution stateRepsPartyDistribution,
                        RaceCount stateRepsRaceDistribution) {
        this.id = id;
        this.state = state;
        this.statePopulation = statePopulation;
        this.voterDistribution = voterDistribution;
        this.caucasianPop = caucasianPop;
        this.africanAmericanPop = africanAmericanPop;
        this.stateRepsPartyDistribution = stateRepsPartyDistribution;
        this.stateRepsRaceDistribution = stateRepsRaceDistribution;
        System.out.println("hello");
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

    public PartyDistribution getVoterDistribution() {
        return voterDistribution;
    }

    public void setVoterDistribution(PartyDistribution voterDistribution) {
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

    public PartyDistribution getStateRepsPartyDistribution() {
        return stateRepsPartyDistribution;
    }

    public void setStateRepsPartyDistribution(PartyDistribution stateRepsPartyDistribution) {
        this.stateRepsPartyDistribution = stateRepsPartyDistribution;
    }

    public RaceCount getStateRepsRaceDistribution() {
        return stateRepsRaceDistribution;
    }

    public void setStateRepsRaceDistribution(RaceCount stateRepsRaceDistribution) {
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