package com.example.demo.service;

import com.example.demo.models.RAM;
import com.example.demo.repository.RamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class RamServiceImp implements RamService{
    @Autowired
    RamRepository ramRepository;

    @Override
    public RAM findById(int id) {
        return ramRepository.findById(id).get();
    }

    @Override
    public List<RAM> findAll() {
        return ramRepository.findAll();
    }
}
