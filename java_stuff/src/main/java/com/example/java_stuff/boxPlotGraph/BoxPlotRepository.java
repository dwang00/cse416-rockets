package com.example.java_stuff.boxPlotGraph;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BoxPlotRepository extends MongoRepository<BoxPlot, String>{
    List<BoxPlot> findAll();
}
