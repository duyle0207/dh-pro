package com.project.dhpro.service;

import com.project.dhpro.models.CPU;

import java.util.List;

public interface CPUService {
    List<CPU> findAll();
    CPU findCPUById(int id);
}
