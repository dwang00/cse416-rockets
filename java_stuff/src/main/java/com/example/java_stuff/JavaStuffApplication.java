package com.example.java_stuff;

import com.example.java_stuff.geojson.GeoJsonController;
import com.example.java_stuff.stateAssemblyRaceData.StateAssemblyRaceController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.java_stuff.stateAssemblyRaceData", "com.example.java_stuff.geojson"})
public class JavaStuffApplication{
    public static void main(String[] args) {
        SpringApplication.run(JavaStuffApplication.class, args);
    }

}
