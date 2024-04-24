package com.example.java_stuff.statesummary;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StateSummaryRepository extends MongoRepository<StateSummary, String> {
    List<StateSummary> findAll();
}
