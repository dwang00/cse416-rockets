package com.example.java_stuff.stateassemblyracedata;

import org.springframework.data.mongodb.core.mapping.Field;

public class RaceCount {
    @Field("caucasian")
    private int caucasian;

    @Field("african_american")
    private int africanAmerican;

    @Field("asian")
    private int asian;

    public RaceCount() {

    }
    public RaceCount(int caucasian, int africanAmerican, int asian) {
        this.caucasian = caucasian;
        this.africanAmerican = africanAmerican;
        this.asian = asian;
    }

    public RaceCount(int caucasian, int africanAmerican) {
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
