package com.project.dhpro.service;

import com.project.dhpro.models.CardDoHoa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CardDoHoaService {
    List<CardDoHoa> getAll();

    CardDoHoa findCardById(int id);

    CardDoHoa save(CardDoHoa cardDoHoa);

    void remove(int id);

    Page<CardDoHoa> findAll(Pageable pageable);
}
