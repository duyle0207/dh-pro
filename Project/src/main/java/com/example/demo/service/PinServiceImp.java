package com.example.demo.service;

import com.example.demo.models.Pin;
import com.example.demo.repository.PinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class PinServiceImp implements PinService{
    @Autowired
    PinRepository pinRepository;

    @Override
    public Pin findById(int id) {
        return pinRepository.findById(id);
    }
}
