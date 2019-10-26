package com.project.dhpro.models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "phuongthucthanhtoan")
public class PhuongThucThanhToan {
    @Id
    @Column(name="id")
    private int id;

    @Column(name="tenphuongthucthanhtoan")
    private String tenPhuongThucThanhToan;

    @OneToMany(mappedBy = "phuongThucThanhToan")
    private Set<HoaDon> listHoaDon = new HashSet<>();

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
