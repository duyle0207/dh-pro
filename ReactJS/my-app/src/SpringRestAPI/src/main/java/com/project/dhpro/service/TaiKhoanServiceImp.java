package com.project.dhpro.service;

import com.project.dhpro.models.TaiKhoan;
import com.project.dhpro.repository.TaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class TaiKhoanServiceImp implements TaiKhoanService {
    @Autowired
    TaiKhoanRepository taiKhoanRepository;

    @Override
    public List<TaiKhoan> getAll() {
        return taiKhoanRepository.findAll();
    }

    @Override
    public TaiKhoan findTaiKhoanByUserName(String username) {
        return taiKhoanRepository.findTaiKhoanByUserName(username);
    }

    @Override
    public TaiKhoan save(TaiKhoan taiKhoan) {
        taiKhoanRepository.save(taiKhoan);
        return taiKhoan;
    }
    @Override
    public TaiKhoan findById(int id) {
        return taiKhoanRepository.findById(id).get();
    }
}
