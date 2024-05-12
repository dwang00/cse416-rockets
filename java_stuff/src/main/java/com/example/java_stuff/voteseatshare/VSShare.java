package com.example.java_stuff.voteseatshare;

import com.example.java_stuff.enums.State;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("voteSeatShare")
public class VSShare {
    @Id
    private String id;

    @Field("state")
    private State state;

    @Field("caucasian")
    private Object caucasian;

    @Field("africanamerican")
    private Object africanamerican;

    public VSShare(String id, State state, Object caucasian, Object africanamerican) {
        this.id = id;
        this.state = state;
        this.caucasian = caucasian;
        this.africanamerican = africanamerican;
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

    public Object getCaucasian() {
        return caucasian;
    }

    public void setCaucasian(Object caucasian) {
        this.caucasian = caucasian;
    }

    public Object getAfricanamerican() {
        return africanamerican;
    }

    public void setAfricanamerican(Object africanamerican) {
        this.africanamerican = africanamerican;
    }
}
