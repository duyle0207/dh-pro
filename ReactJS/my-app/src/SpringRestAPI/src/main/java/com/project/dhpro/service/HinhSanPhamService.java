package com.project.dhpro.service;

import com.project.dhpro.models.HinhSanPham;

import java.util.List;

public interface HinhSanPhamService {
    List<HinhSanPham> getAll();

    List<HinhSanPham> getHinhSanPhamsByIdSP(int id);

    HinhSanPham save(HinhSanPham hinhSanPham);
}
