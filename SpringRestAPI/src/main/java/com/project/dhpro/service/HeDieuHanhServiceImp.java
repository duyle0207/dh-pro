package com.project.dhpro.service;

import com.project.dhpro.models.HeDieuHanh;
import com.project.dhpro.repository.HeDieuHanhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class HeDieuHanhServiceImp implements HeDieuHanhService{
    @Autowired
    HeDieuHanhRepository heDieuHanhRepository;
    @Override
    public List<HeDieuHanh> getAll() {
        return heDieuHanhRepository.findAll();
    }
}
