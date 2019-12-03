package com.project.dhpro.service;

import com.project.dhpro.models.KhachHang;
import com.project.dhpro.models.TaiKhoan;
import com.project.dhpro.repository.KhachHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class KhachHangServiceImp implements KhachHangService{

    @Autowired
    KhachHangRepository khachHangRepository;

    @Override
    public List<KhachHang> getAll() {
        return khachHangRepository.findAll();
    }

    @Override
    public KhachHang save(KhachHang khachHang) {
        khachHangRepository.save(khachHang);
        return khachHang;
    }

    @Override
    public KhachHang findKHByIDTaiKhoan(TaiKhoan taiKhoan) {
        return khachHangRepository.findKhachHangByTaiKhoan(taiKhoan);
    }

    @Override
    public int totalCustomers() {
        return khachHangRepository.totalCustomers();
    }
}
