package com.project.dhpro.models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "thuonghieu")
public class ThuongHieu {
    @Id
    @Column(name="id")
    private int id;

    @Column(name="tenthuonghieu")
    private String tenThuongHieu;

    @Column(name="hinh")
    private String hinh;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "thuongHieu")
    private Set<SanPham> listSanPham = new HashSet<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTenThuongHieu() {
        return tenThuongHieu;
    }

    public void setTenThuongHieu(String tenThuongHieu) {
        this.tenThuongHieu = tenThuongHieu;
    }

    public String getHinh() {
        return hinh;
    }

    public void setHinh(String hinh) {
        this.hinh = hinh;
    }
}
