package com.project.dhpro.service;

import com.project.dhpro.models.Pin;
import com.project.dhpro.repository.PinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class PinServiceImp implements PinService{
    @Autowired
    PinRepository pinRepository;

    @Override
    public List<Pin> getAll() {
        return pinRepository.findAll();
    }

    @Override
    public Pin findById(int id) {
        return pinRepository.findById(id).get();
    }

    @Override
    public Page<Pin> getAll(Pageable pageable) {
        return pinRepository.findAll(pageable);
    }

    @Override
    public Pin save(Pin pin) {
        return pinRepository.save(pin);
    }
}
