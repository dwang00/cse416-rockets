package com.example.java_stuff.geojson;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GeoJsonService {
    private final GeoJsonRepository geoJsonRepository;

    private GeoJsonData alData;

    private GeoJsonData deData;

    private GeoJsonData sumsData;

    private List<GeoJsonData> allGeoJsonData;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public GeoJsonService(GeoJsonRepository geoJsonRepository) {
        this.geoJsonRepository = geoJsonRepository;
    }

    public GeoJsonData getGeoJsonData(String region) {
        if(allGeoJsonData == null) {
            allGeoJsonData = geoJsonRepository.findAll();
        }
        for(GeoJsonData data: allGeoJsonData) {
            if(data.getAl() != null)
                alData = data;
            if(data.getDe() != null)
                deData = data;
            if(data.getSums() != null)
                sumsData = data;
        }
        switch (region) {
            case "al":
                return alData;
            case "de":
                return deData;
            case "sums":
                return sumsData;
            default:
                throw new IllegalArgumentException("Invalid region: " + region);
        }
    }
}
