package com.example.java_stuff.geojson;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GeoJsonService {
    private final GeoJsonRepository geoJsonRepository;

    private GeoJsonData alData;
    private boolean alDataLoaded = false;

    private GeoJsonData deData;
    private boolean deDataLoaded = false;

    private GeoJsonData sumsData;
    private boolean sumsDataLoaded = false;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public GeoJsonService(GeoJsonRepository geoJsonRepository) {
        this.geoJsonRepository = geoJsonRepository;
    }

    public GeoJsonData getByAl() {
        if(!alDataLoaded) {
            alData = geoJsonRepository.findByAlNotNull();
            alDataLoaded = true;
        }
        return alData;
    }

    public GeoJsonData getByDe() {
        if(!deDataLoaded) {
            deData = geoJsonRepository.findByDeNotNull();
            deDataLoaded = true;
        }
        return deData;
    }

    public GeoJsonData getBySums() {
        if(!sumsDataLoaded) {
            sumsData = geoJsonRepository.findBySumsNotNull();
            sumsDataLoaded = true;
        }
        return sumsData;
    }

    /*public List<GeoJsonData> getAllGeoJsonData() {
        return geoJsonRepository.findAll();
    }*/

}
