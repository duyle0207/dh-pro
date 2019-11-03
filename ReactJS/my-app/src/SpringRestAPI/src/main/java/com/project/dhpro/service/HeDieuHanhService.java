package com.project.dhpro.service;

import com.project.dhpro.models.HeDieuHanh;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface HeDieuHanhService {
    List<HeDieuHanh> getAll();

    HeDieuHanh findById(int id);

    Page<HeDieuHanh> findAll(Pageable pageable);

    HeDieuHanh save(HeDieuHanh heDieuHanh);
}
