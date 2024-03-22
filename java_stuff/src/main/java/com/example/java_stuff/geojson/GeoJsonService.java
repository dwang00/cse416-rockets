package com.example.java_stuff.geojson;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GeoJsonService {
    private final GeoJsonRepository geoJsonRepository;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public GeoJsonService(GeoJsonRepository geoJsonRepository) {
        this.geoJsonRepository = geoJsonRepository;
    }

    public GeoJsonData getByAl() {
        return geoJsonRepository.findByAlNotNull();
    }

    public GeoJsonData getByDe() {
        return geoJsonRepository.findByDeNotNull();
    }

    public GeoJsonData getBySums() {
        return geoJsonRepository.findBySumsNotNull();
    }

    public List<GeoJsonData> getAllGeoJsonData() {
        return geoJsonRepository.findAll();
    }

}
