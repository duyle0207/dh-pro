package com.project.dhpro.service;

import com.project.dhpro.models.OCung;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OCungService {
    List<OCung> findAll();

    OCung findOCungById(int id);

    Page<OCung> getAll(Pageable pageable);

    OCung save(OCung oCung);
}
