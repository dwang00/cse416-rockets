package com.example.java_stuff.boxPlotGraph;

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

    public List<BoxPlot> getAllBoxPlotData() {
        if(allBoxPlotData == null) {
            allBoxPlotData = boxPlotRepository.findAll();
        }
        return allBoxPlotData;
    }

    public List<BoxPlot> getBoxPlotByState(String state) {
        if(allBoxPlotData == null) {
            allBoxPlotData = boxPlotRepository.findAll();
        }
        List<BoxPlot> plotsInState = new ArrayList<>();
        for(BoxPlot plot : allBoxPlotData) {
            if(plot.getState().toString().equals(state)) {
                plotsInState.add(plot);
            }
        }
        return plotsInState;
    }
}
