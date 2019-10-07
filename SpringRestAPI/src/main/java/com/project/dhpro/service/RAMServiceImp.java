package com.project.dhpro.service;

import com.project.dhpro.models.RAM;
import com.project.dhpro.repository.RAMRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
}
