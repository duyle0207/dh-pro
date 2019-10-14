package com.project.dhpro.service;

import com.project.dhpro.models.NhuCauSuDung;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NhuCauSuDungService{
    List<NhuCauSuDung> findAll();

    NhuCauSuDung findById(int id);
}
