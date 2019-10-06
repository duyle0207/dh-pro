package com.example.demo.models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ram")
public class RAM {

    @Id
    @Column(name="id")
    private int Id;

    @Column(name="bonhoram")
    private int BoNhoRAM;

    @Column(name="loairam")
    private String LoaiRAM;

    @Column(name="tocdobus")
    private int TocDoBus;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public int getBoNhoRAM() {
        return BoNhoRAM;
    }

    public void setBoNhoRAM(int boNhoRAM) {
        BoNhoRAM = boNhoRAM;
    }

    public String getLoaiRAM() {
        return LoaiRAM;
    }

    public void setLoaiRAM(String loaiRAM) {
        LoaiRAM = loaiRAM;
    }

    public int getTocDoBus() {
        return TocDoBus;
    }

    public void setTocDoBus(int tocDoBus) {
        TocDoBus = tocDoBus;
    }
}
