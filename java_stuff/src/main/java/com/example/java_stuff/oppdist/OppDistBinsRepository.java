package com.example.java_stuff.oppdist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OppDistBinsRepository extends MongoRepository<OppDistBins, String> {
    List<OppDistBins> findByState(String state);
}
