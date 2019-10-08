package com.project.dhpro.models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "motasanpham")
public class MoTaSanPham {
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "idsp")
    private int idSP;

    @Column(name = "tieude")
    private String tieuDe;

    @Column(name = "noidung")
    private String noiDung;

    @Column(name = "idhinh")
    private int idHinh;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdSP() {
        return idSP;
    }

    public void setIdSP(int idSP) {
        this.idSP = idSP;
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

    public int getIdHinh() {
        return idHinh;
    }

    public void setIdHinh(int idHinh) {
        this.idHinh = idHinh;
    }
}
