package com.project.dhpro.service;

import com.project.dhpro.models.ManHinh;
import com.project.dhpro.repository.ManHinhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ManHinhServiceImp implements ManHinhService{
    @Autowired
    ManHinhRepository manHinhRepository;

    @Override
    public List<ManHinh> findAll() {
        return manHinhRepository.findAll();
    }

    @Override
    public ManHinh findById(int id) {
        return manHinhRepository.findById(id).get();
    }

    @Override
    public Page<ManHinh> getAll(Pageable pageable) {
        return manHinhRepository.findAll(pageable);
    }

    @Override
    public ManHinh save(ManHinh manHinh) {
        return manHinhRepository.save((manHinh));
    }
}
