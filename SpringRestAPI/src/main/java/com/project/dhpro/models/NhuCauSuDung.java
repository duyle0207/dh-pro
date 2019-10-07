package com.project.dhpro.models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="nhucausudung")
public class NhuCauSuDung {

    @Id
    @Column(name="id")
    private int Id;

    @Column(name="tennhucau")
    private String tenNhuCauSuDung;

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
