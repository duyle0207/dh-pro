package com.example.demo.service;

import com.example.demo.models.RAM;

import java.util.List;

public interface RamService {
    RAM findById(int id);
    List<RAM> findAll();
}
