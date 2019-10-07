package com.example.demo.repository;

import com.example.demo.models.CPU;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CPURepository extends JpaRepository<CPU, Integer> {
    CPU findById(int id);
}
