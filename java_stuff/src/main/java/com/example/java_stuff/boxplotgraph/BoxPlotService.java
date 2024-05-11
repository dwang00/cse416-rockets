package com.example.java_stuff.boxplotgraph;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BoxPlotService {
    private final BoxPlotRepository boxPlotRepository;

    private List<BoxPlot> allBoxPlotData;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public BoxPlotService(BoxPlotRepository boxPlotRepository) {
        this.boxPlotRepository = boxPlotRepository;
    }

    /*public List<BoxPlot> getAllBoxPlotData() {
        if(allBoxPlotData == null) {
            allBoxPlotData = boxPlotRepository.findAll();
        }
        return allBoxPlotData;
    }

    public List<BoxPlot> getBoxPlotByState(String state) {
        List<BoxPlot> plotsInState;
        plotsInState = boxPlotRepository.findByState(state);
        return plotsInState;
    }*/

    public BoxPlot getBoxPlotByState(String state) {
        BoxPlot plotsInState;
        plotsInState = boxPlotRepository.findByState(state);
        return plotsInState;
    }
}
