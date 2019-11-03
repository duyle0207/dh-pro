package com.project.dhpro.service;

import com.project.dhpro.models.CPU;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CPUService {
    List<CPU> findAll();

    CPU findCPUById(int id);

    CPU save(CPU cpu);

    Page<CPU> getAll(Pageable pageable);
}
