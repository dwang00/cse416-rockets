package com.example.java_stuff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@SpringBootApplication
@RestController
@RequestMapping("/get_geojson")
public class GeoJsonController {

    private final GeoJsonService geoJsonService;
    private final Logger logger = LoggerFactory.getLogger(GeoJsonController.class);
    @Autowired
    public GeoJsonController(GeoJsonService geoJsonService) {
        this.geoJsonService = geoJsonService;
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/all")
    public List<GeoJsonData> getAllGeoJsonData() {
        List<GeoJsonData> geoJsonDataList = geoJsonService.getAllGeoJsonData();

        logger.info("Fetched GeoJsonData: {}", geoJsonDataList);

        return geoJsonService.getAllGeoJsonData();
    }

}
