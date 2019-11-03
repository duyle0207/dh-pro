package com.project.dhpro.service;

import com.project.dhpro.models.ManHinh;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ManHinhService {
    List<ManHinh> findAll();

    ManHinh findById(int id);

    Page<ManHinh> getAll(Pageable pageable);

    ManHinh save(ManHinh manHinh);
}
