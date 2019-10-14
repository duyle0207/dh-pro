package com.project.dhpro.service;

import com.project.dhpro.models.Pin;

import java.util.List;

public interface PinService {
    List<Pin> getAll();

    Pin findById(int id);
}
