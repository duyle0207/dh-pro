package com.project.dhpro.service;

import com.project.dhpro.models.NhuCauSuDung;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;

public interface NhuCauSuDungService{
    List<NhuCauSuDung> findAll();

    NhuCauSuDung findById(int id);

    Page<NhuCauSuDung> getAll(Pageable pageable);

    NhuCauSuDung save(NhuCauSuDung nhuCauSuDung);
}
