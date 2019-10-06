package com.dhpro.models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "cpu")
public class CPU {
    @Id
    @Column(name = "id")
    private int Id;

    @Column(name="tencpu")
    private String TenCPU;

    @Column(name="tocdocpu")
    private float TocDoCPU;

    @Column(name="congnghecpu")
    private String CongNgheCPU;

    @Column(name="bonhodemcpu")
    private String BoNhoDemCPU;

    @Column(name="tocdoturbo")
    private float TocDoTurbo;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getTenCPU() {
        return TenCPU;
    }

    public void setTenCPU(String tenCPU) {
        TenCPU = tenCPU;
    }

    public float getTocDoCPU() {
        return TocDoCPU;
    }

    public void setTocDoCPU(float tocDoCPU) {
        TocDoCPU = tocDoCPU;
    }

    public String getCongNgheCPU() {
        return CongNgheCPU;
    }

    public void setCongNgheCPU(String congNgheCPU) {
        CongNgheCPU = congNgheCPU;
    }

    public String getBoNhoDemCPU() {
        return BoNhoDemCPU;
    }

    public void setBoNhoDemCPU(String boNhoDemCPU) {
        BoNhoDemCPU = boNhoDemCPU;
    }

    public float getTocDoTurbo() {
        return TocDoTurbo;
    }

    public void setTocDoTurbo(float tocDoTurbo) {
        TocDoTurbo = tocDoTurbo;
    }
}
