package com.project.dhpro.models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "hoadon")
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "idkh")
    private KhachHang khachHang;

    @Column(name = "tenkh")
    private String tenKH;

    @Column(name = "diachi")
    private String diaChi;

    @Column(name = "sodt")
    private String soDT;

    @Column(name = "ngaymuahang")
    private String ngayMuaHang;

    @Column(name = "tongtien")
    private int tongTien;

    @ManyToOne
    @JoinColumn(name = "phuongthucthanhtoan")
    private PhuongThucThanhToan phuongThucThanhToan;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "hoaDon")
    private Set<ChiTietHoaDon> listChiTietHoaDon = new HashSet<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public KhachHang getKhachHang() {
        return khachHang;
    }

    public void setKhachHang(KhachHang khachHang) {
        this.khachHang = khachHang;
    }

    public String getTenKH() {
        return tenKH;
    }

    public void setTenKH(String tenKH) {
        this.tenKH = tenKH;
    }

    public String getTen() {
        return tenKH;
    }

    public void setTen(String tenKH) {
        this.tenKH = tenKH;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public String getSoDT() {
        return soDT;
    }

    public void setSoDT(String soDT) {
        this.soDT = soDT;
    }

    public String getNgayMuaHang() {
        return ngayMuaHang;
    }

    public void setNgayMuaHang(String ngayMuaHang) {
        this.ngayMuaHang = ngayMuaHang;
    }

    public int getTongTien() {
        return tongTien;
    }

    public void setTongTien(int tongTien) {
        this.tongTien = tongTien;
    }

    public PhuongThucThanhToan getPhuongThucThanhToan() {
        return phuongThucThanhToan;
    }

    public void setPhuongThucThanhToan(PhuongThucThanhToan phuongThucThanhToan) {
        this.phuongThucThanhToan = phuongThucThanhToan;
    }
}
