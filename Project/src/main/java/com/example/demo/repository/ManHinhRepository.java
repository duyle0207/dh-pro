package com.example.demo.repository;

import com.example.demo.models.ManHinh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManHinhRepository extends JpaRepository<ManHinh,Integer> {
    ManHinh findById(int id);
}
