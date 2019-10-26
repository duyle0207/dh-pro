package com.project.dhpro.service;


import com.project.dhpro.models.NhuCauSuDung;
import com.project.dhpro.repository.NhuCauSuDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class NhuCauSuDungServiceImp implements NhuCauSuDungService{
    @Autowired
    NhuCauSuDungRepository nhuCauSuDungRepository;

    @Override
    public List<NhuCauSuDung> findAll() {
        return nhuCauSuDungRepository.findAll();
    }

    @Override
    public NhuCauSuDung findById(int id) {
        return nhuCauSuDungRepository.findById(id).get();
    }
}
