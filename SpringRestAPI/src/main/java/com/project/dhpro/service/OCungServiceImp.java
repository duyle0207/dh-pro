package com.project.dhpro.service;

import com.project.dhpro.models.OCung;
import com.project.dhpro.repository.OCungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class OCungServiceImp implements OCungService{
    @Autowired
    OCungRepository oCungRepository;

    @Override
    public List<OCung> findAll() {
        return oCungRepository.findAll();
    }
}
