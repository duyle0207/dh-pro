package com.project.dhpro.service;

import com.project.dhpro.models.SanPham;
import com.project.dhpro.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class SanPhamServiceImp implements SanPhamService{
    @Autowired
    SanPhamRepository sanPhamRepository;
    @Override
    public List<SanPham> getAll() {
        return sanPhamRepository.findAll();
    }

    @Override
    public SanPham findById(int id) {
        return sanPhamRepository.findById(id).get();
    }

    @Override
    public SanPham save(SanPham sanPham) {
        sanPhamRepository.save(sanPham);
        return sanPham;
    }
}
