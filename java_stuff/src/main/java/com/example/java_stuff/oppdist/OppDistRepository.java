package com.example.java_stuff.oppdist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OppDistRepository extends MongoRepository<OppDistData, String>{
    List<OppDistData> findByState(String state);

    
}
