package com.example.demo.repository;

import com.example.demo.models.CardDoHoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardDoHoaRepository extends JpaRepository<CardDoHoa,Integer> {
    CardDoHoa findById(int id);
}
