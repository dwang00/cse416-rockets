package com.example.java_stuff;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.java_stuff.hormembers",
        "com.example.java_stuff.stateassemblyracedata",
        "com.example.java_stuff.geojson", "com.example.java_stuff.gingles",
        "com.example.java_stuff.boxplotgraph","com.example.java_stuff.statesummary",
        "com.example.java_stuff.ecoInf", "com.example.java_stuff.precinctdata"})
public class JavaStuffApplication{
    public static void main(String[] args) {
        SpringApplication.run(JavaStuffApplication.class, args);
    }

}
