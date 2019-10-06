package com.example.demo.models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "khachhang")
public class KhachHang {
    @Id
    @Column(name="id")
    private int Id;

    @Column(name="idtk")
    private int ID_TK;

    @Column(name="ten")
    private String Ten;

    @Column(name="diachi")
    private String DiaChi;

    @Column(name="email")
    private String Email;

    @Column(name="sodt")
    private String SoDT;

    @Column(name="ngaysinh")
    private String NgaySinh;

    @Column(name="gioitinh")
    private boolean GioiTinh;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public int getID_TK() {
        return ID_TK;
    }

    public void setID_TK(int ID_TK) {
        this.ID_TK = ID_TK;
    }

    public String getTen() {
        return Ten;
    }

    public void setTen(String ten) {
        Ten = ten;
    }

    public String getDiaChi() {
        return DiaChi;
    }

    public void setDiaChi(String diaChi) {
        DiaChi = diaChi;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getSoDT() {
        return SoDT;
    }

    public void setSoDT(String soDT) {
        SoDT = soDT;
    }

    public String getNgaySinh() {
        return NgaySinh;
    }

    public void setNgaySinh(String ngaySinh) {
        NgaySinh = ngaySinh;
    }

    public boolean isGioiTinh() {
        return GioiTinh;
    }

    public void setGioiTinh(boolean gioiTinh) {
        GioiTinh = gioiTinh;
    }
}
