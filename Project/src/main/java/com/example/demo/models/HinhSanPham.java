package com.example.demo.models;
import javax.persistence.Id;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "hinhsanpham")
public class HinhSanPham {

    @Id
    @Column(name="id")
    private int Id;

    @Column(name="idsp")
    private int ID_SP;

    @Column(name="hinh")
    private String Hinh;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public int getID_SP() {
        return ID_SP;
    }

    public void setID_SP(int ID_SP) {
        this.ID_SP = ID_SP;
    }

    public String getHinh() {
        return Hinh;
    }

    public void setHinh(String hinh) {
        Hinh = hinh;
    }
}
