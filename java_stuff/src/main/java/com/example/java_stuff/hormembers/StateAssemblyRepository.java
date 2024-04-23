package com.example.java_stuff.hormembers;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StateAssemblyRepository extends MongoRepository<StateAssembly, String>{
    List<StateAssembly> findAll();
}
