package com.project.dhpro.models;

import javax.persistence.*;

@Entity
@Table(name="binhluan")
public class BinhLuan {
    @Id
    @Column(name = "id")
    private int Id;

    @OneToOne
    @JoinColumn(name = "idkh")
    private TaiKhoan taiKhoan;

    @ManyToOne
    @JoinColumn(name = "idsp")
    private SanPham sanPham;

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

    public TaiKhoan getTaiKhoan() {
        return taiKhoan;
    }

    public void setTaiKhoan(TaiKhoan taiKhoan) {
        this.taiKhoan = taiKhoan;
    }

    public SanPham getSanPham() {
        return sanPham;
    }

    public void setSanPham(SanPham sanPham) {
        this.sanPham = sanPham;
    }

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
