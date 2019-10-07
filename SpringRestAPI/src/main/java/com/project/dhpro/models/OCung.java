package com.project.dhpro.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="ocung")
public class OCung {
    @Id
    @Column(name="id")
    private int Id;

    @Column(name = "tenocung")
    private String tenOCung;

    @Column(name = "dungluong")
    private int dungLuong;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getTenOCung() {
        return tenOCung;
    }

    public void setTenOCung(String tenOCung) {
        this.tenOCung = tenOCung;
    }

    public int getDungLuong() {
        return dungLuong;
    }

    public void setDungLuong(int dungLuong) {
        this.dungLuong = dungLuong;
    }
}
