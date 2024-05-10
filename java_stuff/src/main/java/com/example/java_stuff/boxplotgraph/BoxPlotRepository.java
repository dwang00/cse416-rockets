package com.example.java_stuff.boxplotgraph;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BoxPlotRepository extends MongoRepository<BoxPlot, String>{
    List<BoxPlot> findAll();
    List<BoxPlot> findByState(String state);
}
