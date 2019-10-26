package com.project.dhpro.models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="manhinh")
public class ManHinh {

    @Id
    @Column(name="id")
    private int Id;

    @Column(name="kichthuoc")
    private String kichThuoc;

    @Column(name="dophangiai")
    private String doPhanGiai;

    @Column(name="congnghemanhinh")
    private String congNgheManHinh;

    @Column(name="manhinhcamung")
    private boolean manHinhCamUng;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "manHinh")
    private Set<SanPham> listSanPham = new HashSet<>();

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getKichThuoc() {
        return kichThuoc;
    }

    public void setKichThuoc(String kichThuoc) {
        this.kichThuoc = kichThuoc;
    }

    public String getDoPhanGiai() {
        return doPhanGiai;
    }

    public void setDoPhanGiai(String doPhanGiai) {
        this.doPhanGiai = doPhanGiai;
    }

    public String getCongNgheManHinh() {
        return congNgheManHinh;
    }

    public void setCongNgheManHinh(String congNgheManHinh) {
        this.congNgheManHinh = congNgheManHinh;
    }

    public boolean isManHinhCamUng() {
        return manHinhCamUng;
    }

    public void setManHinhCamUng(boolean manHinhCamUng) {
        this.manHinhCamUng = manHinhCamUng;
    }
}
