package com.example.java_stuff.config;

import com.example.java_stuff.converters.PartyConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class MongoConfig {

    @Bean
    public MongoCustomConversions customConversions() {
        List<Object> converters = new ArrayList<>();
        converters.add(new PartyConverter());
        return new MongoCustomConversions(converters);
    }
}
