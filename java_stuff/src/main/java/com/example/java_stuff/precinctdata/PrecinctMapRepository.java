package com.example.java_stuff.precinctdata;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrecinctMapRepository extends MongoRepository<PrecinctMap, String>{
    PrecinctMap findByState(String state);
}
