package com.example.java_stuff;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("geojson")
public class GeoJsonData {
    @Id
    private String id;

    @Field("al")
    private String al;

    @Field("de")
    private String de;

    @Field("sums")
    private String sums;

    public GeoJsonData(String id, String al, String de, String sums) {
        this.id = id;
        this.al = al;
        this.de = de;
        this.sums = sums;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAl() {
        return al;
    }
    public void setAl(String al) {
        this.al = al;
    }

    public String getDe() {
        return de;
    }

    public void setDe(String de) {
        this.de = de;
    }

    public String getSums() {
        return sums;
    }

    public void setSums(String sums) {
        this.sums = sums;
    }
}
