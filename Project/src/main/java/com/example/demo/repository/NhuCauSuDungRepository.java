package com.example.demo.repository;

import com.example.demo.models.NhuCauSuDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NhuCauSuDungRepository extends JpaRepository<NhuCauSuDung,Integer> {
}
