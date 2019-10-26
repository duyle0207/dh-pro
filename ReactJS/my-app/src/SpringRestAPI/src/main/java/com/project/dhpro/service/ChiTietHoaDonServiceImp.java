package com.project.dhpro.service;

import com.project.dhpro.models.ChiTietHoaDon;
import com.project.dhpro.repository.ChiTietHoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class ChiTietHoaDonServiceImp implements ChiTietHoaDonService{
    @Autowired
    ChiTietHoaDonRepository chiTietHoaDonRepository;

    @Override
    public List<ChiTietHoaDon> getAll() {
        return chiTietHoaDonRepository.findAll();
    }
}
