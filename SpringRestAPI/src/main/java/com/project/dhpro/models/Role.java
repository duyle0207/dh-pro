package com.project.dhpro.models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "role")
public class Role {
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "tenrole")
    private String tenRole;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "role")
    private Set<TaiKhoan> listTaiKhoan = new HashSet<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTenRole() {
        return tenRole;
    }

    public void setTenRole(String tenRole) {
        this.tenRole = tenRole;
    }
}
