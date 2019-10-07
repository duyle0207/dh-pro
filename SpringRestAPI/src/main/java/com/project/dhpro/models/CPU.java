package com.project.dhpro.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="cpu")
public class CPU {

    @Id
    @Column(name="id")
    private int Id;

    @Column(name = "tencpu")
    private String tenCPU;

    @Column(name="tocdocpu")
    private float tocDoCPU;

    @Column(name="congnghecpu")
    private String congNgheCPU;

    @Column(name="bonhodemcpu")
    private String boNhoDemCPU;

    @Column(name="tocdoturbo")
    private float tocDoTurbo;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getTenCPU() {
        return tenCPU;
    }

    public void setTenCPU(String tenCPU) {
        this.tenCPU = tenCPU;
    }

    public float getTocDoCPU() {
        return tocDoCPU;
    }

    public void setTocDoCPU(float tocDoCPU) {
        this.tocDoCPU = tocDoCPU;
    }

    public String getCongNgheCPU() {
        return congNgheCPU;
    }

    public void setCongNgheCPU(String congNgheCPU) {
        this.congNgheCPU = congNgheCPU;
    }

    public String getBoNhoDemCPU() {
        return boNhoDemCPU;
    }

    public void setBoNhoDemCPU(String boNhoDemCPU) {
        this.boNhoDemCPU = boNhoDemCPU;
    }

    public float getTocDoTurbo() {
        return tocDoTurbo;
    }

    public void setTocDoTurbo(float tocDoTurbo) {
        this.tocDoTurbo = tocDoTurbo;
    }
}
