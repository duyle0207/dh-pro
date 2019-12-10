package com.project.dhpro.repository;

import com.project.dhpro.models.HoaDon;
import com.project.dhpro.models.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HoaDonRepository extends JpaRepository<HoaDon,Integer> {

    List<HoaDon> getHoaDonsByKhachHangOrderByIdDesc(KhachHang khachHang);

    @Query(value="select sum(tongtien) as doanhthu from hoadon where month(hoadon.ngaymuahang) = month(curdate())",nativeQuery = true)
    int totalSalesOfMonth();

    @Query(value="select count(*) as luotdathang from hoadon where month(hoadon.ngaymuahang) = month(curdate())",nativeQuery = true)
    int totalOrdersOfMonth();

    @Query(value="select day(ngaymuahang) as ngaymua, sum(tongtien), count(*) as sodon from hoadon where month(ngaymuahang) = month(curdate()) group by day(ngaymuahang)",nativeQuery = true)
    List<Object[]> saleDaysInMonth();

    @Query(value="select month(ngaymuahang) as thangmua, sum(tongtien), count(*) as sodon from hoadon where year(ngaymuahang) = year(curdate()) group by month(ngaymuahang)",nativeQuery = true)
    List<Object[]> saleMonthsInYear();
    List<HoaDon> findAllByOrderByIdDesc();
}
