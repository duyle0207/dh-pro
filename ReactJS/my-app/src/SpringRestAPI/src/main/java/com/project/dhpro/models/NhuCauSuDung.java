package com.project.dhpro.models;


import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="nhucausudung")
public class NhuCauSuDung {

    @Id
    @Column(name="id")
    private int Id;

    @Column(name="tennhucau")
    private String tenNhuCauSuDung;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "nhuCauSuDung")
    private Set<SanPham> listSanPham = new HashSet<>();

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getTenNhuCauSuDung() {
        return tenNhuCauSuDung;
    }

    public void setTenNhuCauSuDung(String tenNhuCauSuDung) {
        this.tenNhuCauSuDung = tenNhuCauSuDung;
    }
}
