package com.example.java_stuff.oppdist;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OppDistMapRepository extends MongoRepository<OppDistMap, String>{
    List<OppDistMap> findByState(String state);
}
