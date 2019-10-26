package com.project.dhpro.service;

import com.project.dhpro.models.PhuongThucThanhToan;
import com.project.dhpro.repository.PhuongThucThanhToanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class PhuongThucThanhToanServiceImp implements PhuongThucThanhToanService{
    @Autowired
    PhuongThucThanhToanRepository phuongThucThanhToanRepository;
    @Override
    public List<PhuongThucThanhToan> getAll() {
        return phuongThucThanhToanRepository.findAll();
    }
}
