package com.project.dhpro.service;

import com.project.dhpro.models.RAM;

import java.util.List;

public interface RAMService {
    List<RAM> findAll();
    RAM findById(int id);
}
