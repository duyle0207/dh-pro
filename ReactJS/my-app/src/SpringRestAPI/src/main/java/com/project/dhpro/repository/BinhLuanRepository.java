package com.project.dhpro.repository;

import com.project.dhpro.models.BinhLuan;
import com.project.dhpro.models.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BinhLuanRepository extends JpaRepository<BinhLuan, Integer> {

    List<BinhLuan> getBinhLuansByIdSP(int id);

}
