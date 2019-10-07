package com.example.demo.models;

import javax.persistence.*;

@Entity
@Table(name = "example")
public class NhuCauSuDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "tennhucau")
    private String TenNhuCau;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTenNhuCau() {
        return TenNhuCau;
    }

    public void setTenNhuCau(String tenNhuCau) {
        TenNhuCau = tenNhuCau;
    }
}
