package com.project.dhpro.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "phuongthucthanhtoan")
public class PhuongThucThanhToan {
    @Id
    @Column(name="id")
    private int id;

    @Column(name="tenphuongthucthanhtoan")
    private String tenPhuongThucThanhToan;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTenPhuongThucThanhToan() {
        return tenPhuongThucThanhToan;
    }

    public void setTenPhuongThucThanhToan(String tenPhuongThucThanhToan) {
        this.tenPhuongThucThanhToan = tenPhuongThucThanhToan;
    }
}
