package com.dhpro.models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "pin")
public class Pin {

    @Id
    @Column(name="id")
    private int Id;

    @Column(name="thongtinpin")
    private String ThongTinPin;

    @Column(name="thoigiansudung")
    private int ThoiGianSuDung;

    @Column(name="bosac")
    private String BoSac;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getThongTinPin() {
        return ThongTinPin;
    }

    public void setThongTinPin(String thongTinPin) {
        ThongTinPin = thongTinPin;
    }

    public int getThoiGianSuDung() {
        return ThoiGianSuDung;
    }

    public void setThoiGianSuDung(int thoiGianSuDung) {
        ThoiGianSuDung = thoiGianSuDung;
    }

    public String getBoSac() {
        return BoSac;
    }

    public void setBoSac(String boSac) {
        BoSac = boSac;
    }

}
