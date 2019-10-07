package com.example.demo.service;

import com.example.demo.models.CardDoHoa;
import com.example.demo.repository.CardDoHoaRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class CardDoHoaServiceImp implements CardDoHoaService{

    @Autowired
    CardDoHoaRepository cardDoHoaRepository;

    @Override
    public CardDoHoa findById(int id) {
        return cardDoHoaRepository.findById(id);
    }
}
