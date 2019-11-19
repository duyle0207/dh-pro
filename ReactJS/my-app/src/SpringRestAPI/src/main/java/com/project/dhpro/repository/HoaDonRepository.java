package com.project.dhpro.repository;

import com.project.dhpro.models.HoaDon;
import com.project.dhpro.models.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HoaDonRepository extends JpaRepository<HoaDon,Integer> {

    List<HoaDon> getHoaDonsByKhachHang(KhachHang khachHang);

}
