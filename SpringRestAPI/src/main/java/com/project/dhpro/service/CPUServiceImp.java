package com.project.dhpro.service;

import com.project.dhpro.models.CPU;
import com.project.dhpro.repository.CPURepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CPUServiceImp implements CPUService{
    @Autowired
    CPURepository cpuRepository;

    @Override
    public List<CPU> findAll() {
        return cpuRepository.findAll();
    }

    @Override
    public CPU findCPUById(int id) {
        return cpuRepository.findById(id).get();
    }
}
