package com.example.demo.models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "binhluan")
public class BinhLuan {

    @Id
    @Column(name="id")
    private int Id;

    @Column(name="idkh")
    private int ID_KH;

    @Column(name="tieude")
    private String TieuDe;

    @Column(name="noidung")
    private String NoiDung;

    @Column(name="ngaydang")
    private String NgayDang;

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

    public String getTieuDe() {
        return TieuDe;
    }

    public void setTieuDe(String tieuDe) {
        TieuDe = tieuDe;
    }

    public String getNoiDung() {
        return NoiDung;
    }

    public void setNoiDung(String noiDung) {
        NoiDung = noiDung;
    }

    public String getNgayDang() {
        return NgayDang;
    }

    public void setNgayDang(String ngayDang) {
        NgayDang = ngayDang;
    }
}
