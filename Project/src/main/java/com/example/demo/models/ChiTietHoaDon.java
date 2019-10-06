package com.example.demo.models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "hoadon")
public class ChiTietHoaDon {

    final long serialVersionUID = 1L;

    @Id
    @Column(name="idhd")
    private int ID_HD;

    @Column(name="idsp")
    private int ID_SP;

    @Column(name="soluong")
    private int SoLuong;

    @Column(name="dongia")
    private int DonGia;

    public int getID_HD() {
        return ID_HD;
    }

    public void setID_HD(int ID_HD) {
        this.ID_HD = ID_HD;
    }

    public int getID_SP() {
        return ID_SP;
    }

    public void setID_SP(int ID_SP) {
        this.ID_SP = ID_SP;
    }

    public int getSoLuong() {
        return SoLuong;
    }

    public void setSoLuong(int soLuong) {
        SoLuong = soLuong;
    }

    public int getDonGia() {
        return DonGia;
    }

    public void setDonGia(int donGia) {
        DonGia = donGia;
    }
}
