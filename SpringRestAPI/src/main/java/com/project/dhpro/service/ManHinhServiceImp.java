package com.project.dhpro.service;

import com.project.dhpro.models.ManHinh;
import com.project.dhpro.repository.ManHinhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ManHinhServiceImp implements ManHinhService{
    @Autowired
    ManHinhRepository manHinhRepository;

    @Override
    public List<ManHinh> findAll() {
        return manHinhRepository.findAll();
    }
}
