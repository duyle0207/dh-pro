package com.project.dhpro.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "pin")
public class Pin {
    @Id
    @Column(name="id")
    private int id;

    @Column(name="thongtinpin")
    private String thongTinPin;

    @Column(name = "thoigiansudung")
    private  int thoiGianSuDung;

    @Column(name = "bosac")
    private  String boSac;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getThongTinPin() {
        return thongTinPin;
    }

    public void setThongTinPin(String thongTinPin) {
        this.thongTinPin = thongTinPin;
    }

    public int getThoiGianSuDung() {
        return thoiGianSuDung;
    }

    public void setThoiGianSuDung(int thoiGianSuDung) {
        this.thoiGianSuDung = thoiGianSuDung;
    }

    public String getBoSac() {
        return boSac;
    }

    public void setBoSac(String boSac) {
        this.boSac = boSac;
    }
}
