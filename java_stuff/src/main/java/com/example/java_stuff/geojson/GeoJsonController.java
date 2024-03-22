package com.example.java_stuff.geojson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/get_geojson")
public class GeoJsonController {

    private final GeoJsonService geoJsonService;
    private List<GeoJsonData> cachedGeoJsonData;
    private boolean dataLoaded = false;
    
    @Autowired
    public GeoJsonController(GeoJsonService geoJsonService) {
        this.geoJsonService = geoJsonService;
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/all")
    public List<GeoJsonData> getAllGeoJsonData() {
        if(!dataLoaded) {
            cachedGeoJsonData = geoJsonService.getAllGeoJsonData();
            dataLoaded = true;
        }
        return cachedGeoJsonData;
    }

}
