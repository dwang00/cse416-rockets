package com.example.java_stuff.ecoInf;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/get_ecoInf")
public class EcoInfController {
    private final EcoInfService ecoInfService;

    @Autowired
    public EcoInfController(EcoInfService ecoInfService) {
        this.ecoInfService = ecoInfService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("byElection")
    public List<EcoInfData> getByElection(@RequestParam String election) {
        return ecoInfService.getByElection(election);
    }
}
