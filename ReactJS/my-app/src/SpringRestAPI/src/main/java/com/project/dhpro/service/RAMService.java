package com.project.dhpro.service;

import com.project.dhpro.models.RAM;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RAMService {
    List<RAM> findAll();

    RAM findById(int id);

    Page<RAM> getAll(Pageable pageable);

    RAM save(RAM ram);
}
