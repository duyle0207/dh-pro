package com.project.dhpro.models;

import javax.persistence.*;
import java.util.HashSet;

@Entity
@Table(name = "taikhoan")
public class TaiKhoan {
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "username")
    private String userName;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @ManyToOne
    @JoinColumn(name = "role", nullable = false)
    private Role role;

    @OneToOne(mappedBy = "taiKhoan")
    private QuanTriVien quanTriVien;

    @OneToOne(mappedBy = "taiKhoan")
    private KhachHang khachHang;

    @OneToOne(mappedBy = "taiKhoan")
    private BinhLuan binhLuan;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
