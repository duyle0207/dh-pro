package com.project.dhpro.service;

import com.project.dhpro.models.CardDoHoa;
import com.project.dhpro.repository.CardDoHoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.smartcardio.Card;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class CardDoHoaServiceImp implements CardDoHoaService {
    @Autowired
    CardDoHoaRepository cardDoHoaRepository;
    @Override
    public List<CardDoHoa> getAll() {
        return cardDoHoaRepository.findAll();
    }

    @Override
    public CardDoHoa findCardById(int id) {
        return cardDoHoaRepository.findById(id).get();
    }
}
