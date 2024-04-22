package com.example.java_stuff;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.java_stuff.horMembers","com.example.java_stuff.stateAssemblyRaceData", "com.example.java_stuff.geojson"})
public class JavaStuffApplication{
    public static void main(String[] args) {
        SpringApplication.run(JavaStuffApplication.class, args);
    }

}
