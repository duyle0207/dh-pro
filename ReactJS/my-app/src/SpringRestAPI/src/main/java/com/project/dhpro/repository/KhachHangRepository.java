package com.project.dhpro.repository;

import com.project.dhpro.models.KhachHang;
import com.project.dhpro.models.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface KhachHangRepository extends JpaRepository<KhachHang, Integer> {

    KhachHang findKhachHangByTaiKhoan(TaiKhoan taiKhoan);

    @Query(value="select count(*) from khachhang",nativeQuery = true)
    int totalCustomers();
}
