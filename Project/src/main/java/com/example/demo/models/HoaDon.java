package com.example.demo.models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "hoadon")
public class HoaDon {

    @Id
    @Column(name="id")
    private int Id;

    @Column(name="idkh")
    private int ID_KH;

    @Column(name="tenkh")
    private int TenKH;

    @Column(name="diachi")
    private String DiaChi;

    @Column(name="sodt")
    private String SoDT;

    @Column(name="ngaymuahang")
    private String NgayMuaHang;

    @Column(name="tongtien")
    private int TongTien;

    @Column(name="phuongthucthanhtoan")
    private int PhuongThucThanhToan;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public int getID_KH() {
        return ID_KH;
    }

    public void setID_KH(int ID_KH) {
        this.ID_KH = ID_KH;
    }

    public int getTenKH() {
        return TenKH;
    }

    public void setTenKH(int tenKH) {
        TenKH = tenKH;
    }

    public String getDiaChi() {
        return DiaChi;
    }

    public void setDiaChi(String diaChi) {
        DiaChi = diaChi;
    }

    public String getSoDT() {
        return SoDT;
    }

    public void setSoDT(String soDT) {
        SoDT = soDT;
    }

    public String getNgayMuaHang() {
        return NgayMuaHang;
    }

    public void setNgayMuaHang(String ngayMuaHang) {
        NgayMuaHang = ngayMuaHang;
    }

    public int getTongTien() {
        return TongTien;
    }

    public void setTongTien(int tongTien) {
        TongTien = tongTien;
    }

    public int getPhuongThucThanhToan() {
        return PhuongThucThanhToan;
    }

    public void setPhuongThucThanhToan(int phuongThucThanhToan) {
        PhuongThucThanhToan = phuongThucThanhToan;
    }
}
