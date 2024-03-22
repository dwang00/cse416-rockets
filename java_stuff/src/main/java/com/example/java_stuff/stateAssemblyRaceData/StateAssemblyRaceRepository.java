package com.example.java_stuff.stateAssemblyRaceData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StateAssemblyRaceRepository extends MongoRepository<RaceData,String>{
    List<RaceData> findByState(String state);

}
