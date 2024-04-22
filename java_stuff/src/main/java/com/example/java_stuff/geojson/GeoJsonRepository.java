package com.example.java_stuff.geojson;
import org.springframework.data.mongodb.core.geo.GeoJson;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GeoJsonRepository extends MongoRepository<GeoJsonData, String>{

    List<GeoJsonData> findAll();

}
