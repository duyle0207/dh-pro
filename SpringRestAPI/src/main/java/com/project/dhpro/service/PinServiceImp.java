package com.project.dhpro.service;

import com.project.dhpro.models.Pin;
import com.project.dhpro.repository.PinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class PinServiceImp implements PinService{
    @Autowired
    PinRepository pinRepository;

    @Override
    public List<Pin> getAll() {
        return pinRepository.findAll();
    }

    @Override
    public Pin findById(int id) {
        return pinRepository.findById(id).get();
    }
}
