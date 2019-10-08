package com.project.dhpro.models;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ram")
public class RAM {

    @Id
    @Column(name="id")
    private int Id;

    @Column(name="bonhoram")
    private int boNhoRAM;

    @Column(name="loairam")
    private String loaiRAM;

    @Column(name="tocdobus")
    private int tocDoBus;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "ram")
    private Set<SanPham> listSanPham = new HashSet<>();

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public int getBoNhoRAM() {
        return boNhoRAM;
    }

    public void setBoNhoRAM(int boNhoRAM) {
        boNhoRAM = boNhoRAM;
    }

    public String getLoaiRAM() {
        return loaiRAM;
    }

    public void setLoaiRAM(String loaiRAM) {
        loaiRAM = loaiRAM;
    }

    public int getTocDoBus() {
        return tocDoBus;
    }

    public void setTocDoBus(int tocDoBus) {
        tocDoBus = tocDoBus;
    }
}
