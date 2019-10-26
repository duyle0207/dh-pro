package com.project.dhpro.service;

import com.project.dhpro.models.ThuongHieu;

import java.util.List;

public interface ThuongHieuService {
    List<ThuongHieu> getAll();

    ThuongHieu findById(int id);
}
