package com.project.dhpro.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="binhluan")
public class BinhLuan {
    @Id
    @Column(name = "id")
    private int Id;

    @Column(name = "idkh")
    public int idKH;

    @Column(name = "tieude")
    private String tieuDe;

    @Column(name = "noidung")
    private String noiDung;

    @Column(name = "ngaydang")
    private
}
