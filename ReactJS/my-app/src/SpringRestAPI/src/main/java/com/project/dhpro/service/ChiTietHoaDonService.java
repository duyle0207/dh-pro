package com.project.dhpro.service;

import com.project.dhpro.models.ChiTietHoaDon;
import com.project.dhpro.models.HoaDon;
import com.project.dhpro.models.SanPham;

import java.util.List;

public interface ChiTietHoaDonService {
    List<ChiTietHoaDon> getAll();

    ChiTietHoaDon save(ChiTietHoaDon chiTietHoaDon);

    List<ChiTietHoaDon> getChiTietHoaDonsByHoaDon(HoaDon hoaDon);

//    List<ChiTietHoaDon> getChiTietHoaDonsBySanPham(SanPham sanPham);

    ChiTietHoaDon getById(int id);
}
