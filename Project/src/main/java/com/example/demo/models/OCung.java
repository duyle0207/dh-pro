package com.example.demo.models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ocung")
public class OCung {
    @Id
    @Column(name="id")
    private int Id;

    @Column(name="tenocung")
    private String TenOCung;

    @Column(name="dungluongocung")
    private int DungLuongOCung;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getTenOCung() {
        return TenOCung;
    }

    public void setTenOCung(String tenOCung) {
        TenOCung = tenOCung;
    }

    public int getDungLuongOCung() {
        return DungLuongOCung;
    }

    public void setDungLuongOCung(int dungLuongOCung) {
        DungLuongOCung = dungLuongOCung;
    }

}
