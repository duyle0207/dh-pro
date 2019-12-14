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

    @Query(value="select sanpham.id, sanpham.tensp, sum(chitiethoadon.soluong) from chitiethoadon join sanpham on chitiethoadon.idsp = sanpham.id group by sanpham.id order by sum(chitiethoadon.soluong) desc limit 3",nativeQuery = true)
    List<Object[]> hot();

    @Query(value="select sanpham.id, sanpham.tensp, sum(chitiethoadon.soluong) from chitiethoadon join sanpham on chitiethoadon.idsp = sanpham.id group by sanpham.id order by sum(chitiethoadon.soluong) limit 3",nativeQuery = true)
    List<Object[]> not();

    @Query(value="select sanpham.* from chitiethoadon join sanpham on chitiethoadon.idsp = sanpham.id where sanpham.soluong>0 group by sanpham.id order by sum(chitiethoadon.soluong) desc limit 4",nativeQuery = true)
    List<SanPham> bestSeller();

    SanPham findSanPhamByTenSP(String tensp);

    List<SanPham> findTop15By();

}
