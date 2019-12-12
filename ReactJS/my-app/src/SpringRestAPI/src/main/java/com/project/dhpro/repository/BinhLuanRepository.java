package com.project.dhpro.repository;

import com.project.dhpro.models.BinhLuan;
import com.project.dhpro.models.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BinhLuanRepository extends JpaRepository<BinhLuan, Integer> {

//    List<BinhLuan> getBinhLuansByIdSPAndOrderByIdDesc(int id);

    @Query(value="SELECT * FROM binhluan where idsp = :idsp order by binhluan.id desc",nativeQuery = true)
    List<BinhLuan> getBinhLuansByIdSPAndOrderByIdDesc(@Param("idsp") String idsp);

}

