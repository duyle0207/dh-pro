package com.example.demo.models;
import javax.persistence.*;

@Entity
@Table(name = "account")
public class Account {

    @Id
    @Column(name="id")
    private int id;

    @Column(name="username")
    private String Username;

    @Column(name="password")
    private String Password;

    @Column(name="role")
    private int role;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        id = id;
    }

    public String getUsername() {
        return Username;
    }

    public void setUsername(String username) {
        Username = username;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }
}
