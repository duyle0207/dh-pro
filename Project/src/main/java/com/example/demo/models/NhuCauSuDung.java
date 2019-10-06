package com.example.demo.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "nhucausudung")
public class NhuCauSuDung {
    @Id
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
