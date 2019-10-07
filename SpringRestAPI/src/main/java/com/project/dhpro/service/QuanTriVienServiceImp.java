package com.project.dhpro.service;

import com.project.dhpro.models.QuanTriVien;
import com.project.dhpro.repository.QuanTriVienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class QuanTriVienServiceImp implements QuanTriVienService{
    @Autowired
    QuanTriVienRepository quanTriVienRepository;

    @Override
    public List<QuanTriVien> getAll() {
        return quanTriVienRepository.findAll();
    }
}
