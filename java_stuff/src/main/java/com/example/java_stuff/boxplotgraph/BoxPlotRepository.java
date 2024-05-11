package com.example.java_stuff.boxplotgraph;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoxPlotRepository extends MongoRepository<BoxPlot, String>{
    BoxPlot findByState(String state);
}
