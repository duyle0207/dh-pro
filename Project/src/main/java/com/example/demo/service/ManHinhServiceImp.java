package com.example.demo.service;

import com.example.demo.models.ManHinh;
import com.example.demo.repository.ManHinhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class ManHinhServiceImp implements ManHinhService{
    @Autowired
    ManHinhRepository manHinhRepository;

    @Override
    public ManHinh findById(int id) {
        return manHinhRepository.findById(id);
    }
}
