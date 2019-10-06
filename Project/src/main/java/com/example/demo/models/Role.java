package com.example.demo.models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "role")
public class Role {

    @Id
    @Column(name="id")
    private int Id;

    @Column(name="tenrole")
    private String TenRole;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getTenRole() {
        return TenRole;
    }

    public void setTenRole(String tenRole) {
        TenRole = tenRole;
    }
}
