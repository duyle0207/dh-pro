package com.example.demo.service;

import com.example.demo.models.NhuCauSuDung;
import com.example.demo.repository.NhuCauSuDungRepository;
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
    public NhuCauSuDung findById(int id) {
        return null;
    }

    @Override
    public List<NhuCauSuDung> findAll() {
        return nhuCauSuDungRepository.findAll();
    }
}
