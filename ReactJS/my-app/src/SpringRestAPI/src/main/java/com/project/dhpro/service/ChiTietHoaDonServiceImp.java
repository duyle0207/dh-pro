package com.project.dhpro.service;

import com.project.dhpro.models.ChiTietHoaDon;
import com.project.dhpro.models.HoaDon;
import com.project.dhpro.models.SanPham;
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

    @Override
    public ChiTietHoaDon save(ChiTietHoaDon chiTietHoaDon) {
        return chiTietHoaDonRepository.save(chiTietHoaDon);
    }

    @Override
    public List<ChiTietHoaDon> getChiTietHoaDonsByHoaDon(HoaDon hoaDon) {
        return chiTietHoaDonRepository.getChiTietHoaDonsByHoaDon(hoaDon);
    }

//    @Override
//    public List<ChiTietHoaDon> getChiTietHoaDonsBySanPham(SanPham sanPham) {
//        return chiTietHoaDonRepository.getChiTietHoaDonsBySanPham(sanPham);
//    }

    @Override
    public ChiTietHoaDon getById(int id) {
        return chiTietHoaDonRepository.findById(id).get();
    }
}
