package com.project.dhpro.repository;

import com.project.dhpro.models.ChiTietHoaDon;
import com.project.dhpro.models.HoaDon;
import com.project.dhpro.models.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChiTietHoaDonRepository extends JpaRepository<ChiTietHoaDon, Integer> {

    List<ChiTietHoaDon> getChiTietHoaDonsByHoaDon(HoaDon hoaDon);

//    List<ChiTietHoaDon> getChiTietHoaDonsBySanPham(SanPham sanPham);

}
