package com.example.java_stuff.geojson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.geo.GeoJson;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/get_geojson")
public class GeoJsonController {

    private final GeoJsonService geoJsonService;

    private GeoJsonData alData;
    private boolean alDataLoaded = false;

    private GeoJsonData deData;
    private boolean deDataLoaded = false;

    private GeoJsonData sumsData;
    private boolean sumsDataLoaded = false;
    
    @Autowired
    public GeoJsonController(GeoJsonService geoJsonService) {
        this.geoJsonService = geoJsonService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/al_geojson")
    public GeoJsonData getByAl() {
        if(!alDataLoaded) {
            alData = geoJsonService.getByAl();
            alDataLoaded = true;
        }
        return alData;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/de_geojson")
    public GeoJsonData getByDe() {
        if(!deDataLoaded) {
            deData = geoJsonService.getByDe();
            deDataLoaded = true;
        }
        return deData;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/sums_geojson")
    public GeoJsonData getBySums() {
        if(!sumsDataLoaded) {
            sumsData = geoJsonService.getBySums();
            sumsDataLoaded = true;
        }
        return sumsData;
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
