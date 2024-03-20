package com.example.java_stuff;

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
    public List<GeoJsonData> getAllGeoJsonData() {
        return geoJsonRepository.findAll();
    }
}
