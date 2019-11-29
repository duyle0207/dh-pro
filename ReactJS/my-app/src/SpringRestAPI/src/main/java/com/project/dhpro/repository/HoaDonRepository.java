package com.project.dhpro.repository;

import com.project.dhpro.models.HoaDon;
import com.project.dhpro.models.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HoaDonRepository extends JpaRepository<HoaDon,Integer> {

    List<HoaDon> getHoaDonsByKhachHangOrderByIdDesc(KhachHang khachHang);

}
