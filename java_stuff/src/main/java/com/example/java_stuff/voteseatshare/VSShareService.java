package com.example.java_stuff.voteseatshare;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VSShareService {

    private final VSShareRepository vsShareRepository;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public VSShareService(VSShareRepository vsShareRepository) {
        this.vsShareRepository = vsShareRepository;
    }

    public List<VSShare> getByState(String state) {
        return this.vsShareRepository.findByState(state);
    }
}
