package com.project.dhpro.service;

import com.project.dhpro.models.Pin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PinService {
    List<Pin> getAll();

    Pin findById(int id);

    Page<Pin> getAll(Pageable pageable);

    Pin save(Pin pin);
}
