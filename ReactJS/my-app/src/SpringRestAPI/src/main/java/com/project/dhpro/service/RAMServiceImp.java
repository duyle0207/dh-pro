package com.project.dhpro.service;

import com.project.dhpro.models.RAM;
import com.project.dhpro.repository.RAMRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class RAMServiceImp implements RAMService{
    @Autowired
    RAMRepository ramRepository;

    @Override
    public List<RAM> findAll() {
        return ramRepository.findAll();
    }

    @Override
    public RAM findById(int id) {
        return ramRepository.findById(id).get();
    }

    @Override
    public Page<RAM> getAll(Pageable pageable) {
        return ramRepository.findAll(pageable);
    }

    @Override
    public RAM save(RAM ram) {
        return ramRepository.save(ram);
    }
}
