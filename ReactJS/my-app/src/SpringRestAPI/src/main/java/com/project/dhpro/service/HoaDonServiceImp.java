package com.project.dhpro.service;

import com.project.dhpro.models.HoaDon;
import com.project.dhpro.models.KhachHang;
import com.project.dhpro.repository.HoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class HoaDonServiceImp implements HoaDonService{

    @Autowired
    HoaDonRepository hoaDonRepository;

    @Override
    public List<HoaDon> getAll() {
        return hoaDonRepository.findAll();
    }

    @Override
    public HoaDon save(HoaDon hoaDon) {
        return hoaDonRepository.save(hoaDon);
    }

    @Override
    public List<HoaDon> getHoaDonByKhachHang(KhachHang khachHang) {
        return hoaDonRepository.getHoaDonsByKhachHangOrderByIdDesc(khachHang);
    }

    @Override
    public HoaDon getHoaDonByID(int id) {
        return hoaDonRepository.findById(id).get();
    }
}
