package com.example.java_stuff.stateAssemblyRaceData;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("stateAssemblyRaceData")
public class RaceData {
    @Id
    private String id;

    @Field("state")
    private String state;

    @Field("representatives")
    private Representatives representatives;

    public RaceData(String id, String state, Representatives representatives) {
        this.id = id;
        this.state = state;
        this.representatives = representatives;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Representatives getRepresentatives() {
        return representatives;
    }

    public void setRepresentatives(Representatives representatives) {
        this.representatives = representatives;
    }
}

class Representatives {
    @Field("caucasian")
    private int caucasian;

    @Field("african_american")
    private int africanAmerican;

    @Field("asian")
    private int asian;

    public Representatives() {

    }
    public Representatives(int caucasian, int africanAmerican, int asian) {
        this.caucasian = caucasian;
        this.africanAmerican = africanAmerican;
        this.asian = asian;
    }

    public Representatives(int caucasian, int africanAmerican) {
        this.caucasian = caucasian;
        this.africanAmerican = africanAmerican;
        // 'asian' field is not set
    }

    public int getCaucasian() {
        return caucasian;
    }

    public void setCaucasian(int caucasian) {
        this.caucasian = caucasian;
    }

    public int getAfricanAmerican() {
        return africanAmerican;
    }

    public void setAfricanAmerican(int africanAmerican) {
        this.africanAmerican = africanAmerican;
    }

    public int getAsian() {
        return asian;
    }

    public void setAsian(int asian) {
        this.asian = asian;
    }
}
