package com.example.java_stuff.statesummary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/get_summaries")
public class StateSummaryController {
    private final StateSummaryService stateSummaryService;

    @Autowired
    public StateSummaryController(StateSummaryService stateSummaryService) {
        this.stateSummaryService = stateSummaryService;
    }

    @CrossOrigin("http://localhost:3000")
    @GetMapping("summaryByState")
    public List<StateSummary> getSummaryByState(@RequestParam String state) {
        return stateSummaryService.getSummaryByState(state);
    }

}
