package com.example.java_stuff.gingles;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GinglesRepository extends MongoRepository<GinglesData, String> {
    List<GinglesData> findAll();
}
