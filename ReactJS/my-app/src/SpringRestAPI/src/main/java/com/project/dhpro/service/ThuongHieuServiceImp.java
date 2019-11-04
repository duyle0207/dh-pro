package com.project.dhpro.service;

import com.project.dhpro.models.ThuongHieu;
import com.project.dhpro.repository.ThuongHieuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Override
    public Page<ThuongHieu> findAll(Pageable pageable) {
        return thuongHieuRepository.findAll(pageable);
    }

    @Override
    public ThuongHieu save(ThuongHieu thuongHieu) {
        return thuongHieuRepository.save(thuongHieu);
    }

}
