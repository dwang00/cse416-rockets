package com.example.java_stuff.statesummary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StateSummaryService {
    private StateSummaryRepository stateSummaryRepository;
    private List<StateSummary> allData;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public StateSummaryService(StateSummaryRepository stateSummaryRepository) {
        this.stateSummaryRepository = stateSummaryRepository;
    }

    public List<StateSummary> getSummaryByState(String state) {
        if(allData == null) {
            allData = stateSummaryRepository.findAll();
        }
        List<StateSummary> summaryOfState = new ArrayList<>();

        for(StateSummary summary: allData) {
            if(summary.getState().toString().equals(state)) {
                summaryOfState.add(summary);
            }
        }
        return summaryOfState;
    }
}
