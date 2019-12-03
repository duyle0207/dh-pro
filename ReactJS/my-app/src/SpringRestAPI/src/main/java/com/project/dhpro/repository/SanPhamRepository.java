package com.project.dhpro.repository;

import com.project.dhpro.models.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SanPhamRepository extends JpaRepository<SanPham, Integer> {

    @Query(value="SELECT * FROM sanpham where tensp like %:keyword%",nativeQuery = true)
    List<SanPham> search(@Param("keyword") String keyword);

    @Query(value="SELECT * FROM sanpham where tensp like %:keyword% limit 0,6",nativeQuery = true)
    List<SanPham> searchLimit(@Param("keyword") String keyword);

    SanPham findSanPhamByTenSP(String tensp);

}
