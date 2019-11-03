package com.project.dhpro.service;

import com.project.dhpro.models.CPU;
import com.project.dhpro.repository.CPURepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Override
    public CPU save(CPU cpu) {
        return cpuRepository.save(cpu);
    }

    @Override
    public Page<CPU> getAll(Pageable pageable) {
        return cpuRepository.findAll(pageable);
    }
}
