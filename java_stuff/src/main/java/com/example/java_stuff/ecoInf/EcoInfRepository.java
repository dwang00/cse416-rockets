package com.example.java_stuff.ecoInf;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EcoInfRepository extends MongoRepository<EcoInfData, String>{
    List<EcoInfData> findAll();
    List<EcoInfData> findByElection(String election);
    List<EcoInfData> findByState(String state);
}
