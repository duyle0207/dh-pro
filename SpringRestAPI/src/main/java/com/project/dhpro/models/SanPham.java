package com.project.dhpro.models;

import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sanpham")
public class SanPham {
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "tensp")
    private String tenSP;

    @Column(name = "gia")
    private int gia;

    @Column(name = "mausac")
    private String mauSac;

    @Column(name = "trongluong")
    private float trongLuong;

    @Column(name = "kichthuoc")
    private String kichThuoc;

    @Column(name = "amthanh")
    private String amThanh;

    @Column(name = "conggiaotiep")
    private String congGiaoTiep;

    @Column(name = "dophangiaiwc")
    private String doPhanGiaiWC;

    @Column(name = "cpu")
    private int cpu;

    @Column(name = "ocung")
    private int oCung;

    @Column(name = "ram")
    private int ram;

    @Column(name = "carddohoa")
    private int cardDoHoa;

    @Column(name = "manhinh")
    private int manHinh;

    @Column(name = "pin")
    private int pin;

    @Column(name = "hedieuhanh")
    private int heDieuHanh;

    @Column(name = "thuonghieu")
    private int thuongHieu;

    @Column(name = "nhucausudung")
    private int nhuCauSuDung;

    @Column(name = "soluong")
    private int soLuong;

    @Column(name = "hinh")
    private String hinh;

    @Column(name = "tomtat")
    private String tomTat;

    @Column(name = "dophangiai")
    private int doPhanGiai;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTenSP() {
        return tenSP;
    }

    public void setTenSP(String tenSP) {
        this.tenSP = tenSP;
    }

    public int getGia() {
        return gia;
    }

    public void setGia(int gia) {
        this.gia = gia;
    }

    public String getMauSac() {
        return mauSac;
    }

    public void setMauSac(String mauSac) {
        this.mauSac = mauSac;
    }

    public float getTrongLuong() {
        return trongLuong;
    }

    public void setTrongLuong(float trongLuong) {
        this.trongLuong = trongLuong;
    }

    public String getKichThuoc() {
        return kichThuoc;
    }

    public void setKichThuoc(String kichThuoc) {
        this.kichThuoc = kichThuoc;
    }

    public String getAmThanh() {
        return amThanh;
    }

    public void setAmThanh(String amThanh) {
        this.amThanh = amThanh;
    }

    public String getCongGiaoTiep() {
        return congGiaoTiep;
    }

    public void setCongGiaoTiep(String congGiaoTiep) {
        this.congGiaoTiep = congGiaoTiep;
    }

    public String getDoPhanGiaiWC() {
        return doPhanGiaiWC;
    }

    public void setDoPhanGiaiWC(String doPhanGiaiWC) {
        this.doPhanGiaiWC = doPhanGiaiWC;
    }

    public int getCpu() {
        return cpu;
    }

    public void setCpu(int cpu) {
        this.cpu = cpu;
    }

    public int getoCung() {
        return oCung;
    }

    public void setoCung(int oCung) {
        this.oCung = oCung;
    }

    public int getRam() {
        return ram;
    }

    public void setRam(int ram) {
        this.ram = ram;
    }

    public int getCardDoHoa() {
        return cardDoHoa;
    }

    public void setCardDoHoa(int cardDoHoa) {
        this.cardDoHoa = cardDoHoa;
    }

    public int getManHinh() {
        return manHinh;
    }

    public void setManHinh(int manHinh) {
        this.manHinh = manHinh;
    }

    public int getPin() {
        return pin;
    }

    public void setPin(int pin) {
        this.pin = pin;
    }

    public int getHeDieuHanh() {
        return heDieuHanh;
    }

    public void setHeDieuHanh(int heDieuHanh) {
        this.heDieuHanh = heDieuHanh;
    }

    public int getThuongHieu() {
        return thuongHieu;
    }

    public void setThuongHieu(int thuongHieu) {
        this.thuongHieu = thuongHieu;
    }

    public int getNhuCauSuDung() {
        return nhuCauSuDung;
    }

    public void setNhuCauSuDung(int nhuCauSuDung) {
        this.nhuCauSuDung = nhuCauSuDung;
    }

    public int getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(int soLuong) {
        this.soLuong = soLuong;
    }

    public String getHinh() {
        return hinh;
    }

    public void setHinh(String hinh) {
        this.hinh = hinh;
    }

    public String getTomTat() {
        return tomTat;
    }

    public void setTomTat(String tomTat) {
        this.tomTat = tomTat;
    }

    public int getDoPhanGiai() {
        return doPhanGiai;
    }

    public void setDoPhanGiai(int doPhanGiai) {
        this.doPhanGiai = doPhanGiai;
    }
}
