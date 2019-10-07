package com.project.dhpro.service;

import com.project.dhpro.models.HinhSanPham;
import com.project.dhpro.repository.HinhSanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class HinhSanPhamServiceImp implements HinhSanPhamService{
    @Autowired
    HinhSanPhamRepository hinhSanPhamRepository;
    @Override
    public List<HinhSanPham> getAll() {
        return hinhSanPhamRepository.findAll();
    }
}
