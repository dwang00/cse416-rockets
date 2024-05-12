package com.example.java_stuff.boxplotgraph;

import com.example.java_stuff.enums.State;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BoxPlotRepository extends MongoRepository<BoxPlot, String>{
    List<BoxPlot> findByState(State state);

}
