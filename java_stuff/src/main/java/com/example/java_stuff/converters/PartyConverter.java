package com.example.java_stuff.converters;

import com.example.java_stuff.horMembers.StateAssembly;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class PartyConverter implements Converter<String, StateAssembly.Party>{
    @Override
    public StateAssembly.Party convert(String source) {
        return StateAssembly.Party.valueOf(source.toUpperCase());
    }
}
