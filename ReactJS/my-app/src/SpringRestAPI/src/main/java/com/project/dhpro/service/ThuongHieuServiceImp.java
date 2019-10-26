package com.project.dhpro.service;

import com.project.dhpro.models.ThuongHieu;
import com.project.dhpro.repository.ThuongHieuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class ThuongHieuServiceImp implements ThuongHieuService{
    @Autowired
    ThuongHieuRepository thuongHieuRepository;

    @Override
    public List<ThuongHieu> getAll() {
        return  thuongHieuRepository.findAll();
    }

    @Override
    public ThuongHieu findById(int id) {
        return thuongHieuRepository.findById(id).get();
    }
}
