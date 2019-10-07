package com.example.demo.service;

import com.example.demo.models.NhuCauSuDung;

import java.util.List;

public interface NhuCauSuDungService {
    NhuCauSuDung findById(int id);
    List<NhuCauSuDung> findAll();
}
