package com.example.demo.repository;

import com.example.demo.models.Pin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PinRepository extends JpaRepository<Pin,Integer> {
    Pin findById(int id);
}
