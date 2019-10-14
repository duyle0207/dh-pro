package com.project.dhpro.service;

import com.project.dhpro.models.HeDieuHanh;

import java.util.List;

public interface HeDieuHanhService {
    List<HeDieuHanh> getAll();

    HeDieuHanh findById(int id);
}
