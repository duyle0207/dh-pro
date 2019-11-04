package com.project.dhpro.service;

import com.project.dhpro.models.ThuongHieu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ThuongHieuService {
    List<ThuongHieu> getAll();

    ThuongHieu findById(int id);

    Page<ThuongHieu> findAll(Pageable pageable);

    ThuongHieu save(ThuongHieu thuongHieu);
}
