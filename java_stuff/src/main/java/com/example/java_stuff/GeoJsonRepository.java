package com.example.java_stuff;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GeoJsonRepository extends MongoRepository<GeoJsonData, String>{
    List<GeoJsonData> findAll();
}
