package com.project.dhpro.service;

import com.project.dhpro.models.KhachHang;

import java.util.List;

public interface KhachHangService {
    List<KhachHang> getAll();

    KhachHang save(KhachHang khachHang);
}
