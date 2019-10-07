package com.example.demo.repository;

import com.example.demo.models.OCung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OCungRepository extends JpaRepository<OCung,Integer> {
    OCung findById(int id);
}
