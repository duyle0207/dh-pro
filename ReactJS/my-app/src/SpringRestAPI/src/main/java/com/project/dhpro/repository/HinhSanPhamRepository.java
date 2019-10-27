package com.project.dhpro.repository;

import com.project.dhpro.models.HinhSanPham;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HinhSanPhamRepository extends JpaRepository<HinhSanPham, Integer> {
    List<HinhSanPham> getHinhSanPhamsByIdSP(int id);

    void deleteByIdSP(int idsp);
}
