package com.example.demo.models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "thuonghieu")
public class ThuongHieu {

    @Id
    @Column(name="id")
    private int Id;

    @Column(name ="tenthuonghieu")
    private String TenThuongHieu;

    @Column(name="hinh")
    private String Hinh;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getTenThuongHieu() {
        return TenThuongHieu;
    }

    public void setTenThuongHieu(String tenThuongHieu) {
        TenThuongHieu = tenThuongHieu;
    }

    public String getHinh() {
        return Hinh;
    }

    public void setHinh(String hinh) {
        Hinh = hinh;
    }
}
