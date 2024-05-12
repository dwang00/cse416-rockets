package com.example.java_stuff.voteseatshare;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VSShareRepository extends MongoRepository<VSShare, String>{
    public List<VSShare> findByState(String state);
}
