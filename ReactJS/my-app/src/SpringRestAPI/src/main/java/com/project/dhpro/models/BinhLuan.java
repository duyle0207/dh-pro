package com.project.dhpro.models;

import javax.persistence.*;

@Entity
@Table(name="binhluan")
public class BinhLuan {
    @Id
    @Column(name = "id")
    private int Id;

    @Column(name = "idkh")
    private int idkh;

    public int getIdkh() {
        return idkh;
    }

    public void setIdkh(int idkh) {
        this.idkh = idkh;
    }

    @Column(name = "idsp")
    private int idSP;

    public int getIdSP() {
        return idSP;
    }

    public void setIdSP(int idSP) {
        this.idSP = idSP;
    }

    @Column(name = "tieude")
    private String tieuDe;

    @Column(name = "noidung")
    private String noiDung;

    @Column(name = "ngaydang")
    private String ngayDang;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

//    public TaiKhoan getTaiKhoan() {
//        return taiKhoan;
//    }
//
//    public void setTaiKhoan(TaiKhoan taiKhoan) {
//        this.taiKhoan = taiKhoan;
//    }

    public String getTieuDe() {
        return tieuDe;
    }

    public void setTieuDe(String tieuDe) {
        this.tieuDe = tieuDe;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

    public String getNgayDang() {
        return ngayDang;
    }

    public void setNgayDang(String ngayDang) {
        this.ngayDang = ngayDang;
    }
}
