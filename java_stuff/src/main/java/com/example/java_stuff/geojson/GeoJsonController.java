package com.example.java_stuff.geojson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.geo.GeoJson;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/get_geojson")
public class GeoJsonController {

    private final GeoJsonService geoJsonService;
    
    @Autowired
    public GeoJsonController(GeoJsonService geoJsonService) {
        this.geoJsonService = geoJsonService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/al_geojson")
    public GeoJsonData getByAl() {
        return geoJsonService.getByAl();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/de_geojson")
    public GeoJsonData getByDe() {
        return geoJsonService.getByDe();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/sums_geojson")
    public GeoJsonData getBySums() {
        return geoJsonService.getBySums();
    }

    /*
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/all")
    public List<GeoJsonData> getAllGeoJsonData() {
        if(!dataLoaded) {
            cachedGeoJsonData = geoJsonService.getAllGeoJsonData();
            dataLoaded = true;
        }
        return cachedGeoJsonData;
    }*/
}
