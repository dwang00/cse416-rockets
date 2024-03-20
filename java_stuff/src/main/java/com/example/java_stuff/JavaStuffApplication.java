package com.example.java_stuff;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JavaStuffApplication{
    public static void main(String[] args) {
        //SpringApplication.run(JavaStuffApplication.class, args);
        SpringApplication.run(GeoJsonController.class, args);
    }

}
