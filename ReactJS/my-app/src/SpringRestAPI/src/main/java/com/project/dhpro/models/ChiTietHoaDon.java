package com.project.dhpro.models;

import javax.persistence.*;

@Entity
@Table(name = "chitiethoadon")
public class ChiTietHoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "idhd")
    private HoaDon hoaDon;

    @ManyToOne
    @JoinColumn(name = "idsp")
    private SanPham sanPham;

    @Column(name = "soluong")
    private int soLuong;

    @Column(name = "dongia")
    private int donGia;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public HoaDon getHoaDon() {
        return hoaDon;
    }

    public void setHoaDon(HoaDon hoaDon) {
        this.hoaDon = hoaDon;
    }

    public SanPham getSanPham() {
        return sanPham;
    }

    public void setSanPham(SanPham sanPham) {
        this.sanPham = sanPham;
    }

    public int getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(int soLuong) {
        this.soLuong = soLuong;
    }

    public int getDonGia() {
        return donGia;
    }

    public void setDonGia(int donGia) {
        this.donGia = donGia;
    }
}
