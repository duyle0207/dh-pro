package com.project.dhpro.service;

import com.project.dhpro.models.MoTaSanPham;
import com.project.dhpro.repository.MoTaSanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class MoTaSanPhamImp implements MoTaSanPhamService{
    @Autowired
    MoTaSanPhamRepository moTaSanPhamRepository;

    @Override
    public List<MoTaSanPham> getAll() {
        return moTaSanPhamRepository.findAll();
    }
}
