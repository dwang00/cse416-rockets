package com.example.java_stuff.stateassemblyracedata;

import com.example.java_stuff.gingles.*;
import com.example.java_stuff.boxplotgraph.*;
import com.example.java_stuff.precinctdata.*;
import com.example.java_stuff.oppdist.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class GraphsController {
    private final StateAssemblyRaceDataService stateAssemblyRaceService;
    private final GinglesService ginglesService;
    private final BoxPlotService boxPlotService;
    private final PrecinctService precinctService;
    private final OppDistService oppDistService;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public GraphsController(StateAssemblyRaceDataService stateAssemblyRaceService,
                            GinglesService ginglesService, BoxPlotService boxPlotService,
                            PrecinctService precinctService, OppDistService oppDistService) {
        this.stateAssemblyRaceService = stateAssemblyRaceService;
        this.ginglesService = ginglesService;
        this.boxPlotService = boxPlotService;
        this.precinctService = precinctService;
        this.oppDistService = oppDistService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("get_racedata/all")
    public List<StateAssemblyRaceData> getAllStateAssemblyRaceData() {
        return stateAssemblyRaceService.getAllStateAssemblyRaceData();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("get_racedata/byState")
    public List<StateAssemblyRaceData> getStateAssemblyRaceDataByState(
            @RequestParam("state") String state) {
        return stateAssemblyRaceService.getStateAssemblyRaceDataByState(state);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("allGingles")
    public List<GinglesData> getAllGinglesData() {
        return ginglesService.getAllData();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("ginglesByState")
    public List<GinglesData> getGinglesDataByState(@RequestParam("state") String state) {
        return ginglesService.getGinglesByState(state);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("boxPlotByState")
    public List<BoxPlot> getBoxPlotByState(@RequestParam("state") String state) {
        return boxPlotService.getBoxPlotByState(state);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("precinctsByState")
    public List<Precinct> getPrecinctsByState(@RequestParam("state") String state) {
        return precinctService.getPrecinctsByState(state);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("oppDistrictsByState")
    public List<OppDistData> getOppDistsByState(@RequestParam("state") String state) {
        return oppDistService.getByState(state);
    }
}
