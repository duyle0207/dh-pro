package com.example.demo.models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "hedieuhanh")
public class HeDieuHanh {
    @Id
    @Column(name = "id")
    private int Id;

    @Column(name = "tenhedieuhanh")
    private String TenHeDieuHanh;
}
