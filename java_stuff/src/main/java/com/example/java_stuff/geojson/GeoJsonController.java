package com.example.java_stuff.geojson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/get_geojson")
public class GeoJsonController {
    private final GeoJsonService geoJsonService;

    @Autowired
    public GeoJsonController(GeoJsonService geoJsonService) {
        this.geoJsonService = geoJsonService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public GeoJsonData getGeoJsonData(@RequestParam(name = "region") String region) {
        return geoJsonService.getGeoJsonData(region);
    }
}
