package com.example.java_stuff.precinctdata;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PrecinctRepository extends MongoRepository<Precinct, String>{
    List<Precinct> findByState(String state);
}
