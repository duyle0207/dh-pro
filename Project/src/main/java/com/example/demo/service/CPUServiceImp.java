package com.example.demo.service;

import com.example.demo.models.CPU;
import com.example.demo.repository.CPURepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class CPUServiceImp implements CPUService{

    @Autowired
    CPURepository cpuRepository;

    @Override
    public CPU findCPUByID(int id) {
        return cpuRepository.findById(id);
    }
}
