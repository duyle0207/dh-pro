package com.example.demo.service;

import com.example.demo.models.OCung;
import com.example.demo.repository.OCungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class OCungServiceImp implements OCungService{

    @Autowired
    OCungRepository oCungRepository;

    @Override
    public OCung findByID(int id) {
        return oCungRepository.findById(id);
    }
}
