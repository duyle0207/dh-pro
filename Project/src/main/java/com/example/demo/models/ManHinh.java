package com.example.demo.models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "manhinh")
public class ManHinh {
    @Id
    @Column(name = "id")
    private int Id;

    @Column(name="kichthuoc")
    private float KichThuoc;

    @Column(name="dophangiai")
    private String DoPhanGian;

    @Column(name="congnghemanhinh")
    private String CongNgheManHinh;

    @Column(name="manhhinhcamung")
    private boolean ManHinhCamUng;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public float getKichThuoc() {
        return KichThuoc;
    }

    public void setKichThuoc(float kichThuoc) {
        KichThuoc = kichThuoc;
    }

    public String getDoPhanGian() {
        return DoPhanGian;
    }

    public void setDoPhanGian(String doPhanGian) {
        DoPhanGian = doPhanGian;
    }

    public String getCongNgheManHinh() {
        return CongNgheManHinh;
    }

    public void setCongNgheManHinh(String congNgheManHinh) {
        CongNgheManHinh = congNgheManHinh;
    }

    public boolean isManHinhCamUng() {
        return ManHinhCamUng;
    }

    public void setManHinhCamUng(boolean manHinhCamUng) {
        ManHinhCamUng = manHinhCamUng;
    }
}
