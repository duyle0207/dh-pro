package com.project.dhpro.service;

import com.project.dhpro.models.TaiKhoan;

import java.util.List;

public interface TaiKhoanService {
    List<TaiKhoan> getAll();

    TaiKhoan findTaiKhoanByUserName(String username);
    TaiKhoan save(TaiKhoan taiKhoan);
    TaiKhoan findById(int id);
}
