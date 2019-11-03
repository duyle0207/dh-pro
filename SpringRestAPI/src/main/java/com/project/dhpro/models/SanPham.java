package com.project.dhpro.models;

import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

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

    @Column(name = "status")
    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "cpu")
    private CPU cpu;

    @ManyToOne
    @JoinColumn(name = "ocung")
    private OCung oCung;

    @ManyToOne
    @JoinColumn(name = "ram")
    private RAM ram;

    @ManyToOne
    @JoinColumn(name = "carddohoa")
    private CardDoHoa cardDoHoa;

    @ManyToOne
    @JoinColumn(name = "manhinh")
    private ManHinh manHinh;

    @ManyToOne
    @JoinColumn(name = "pin")
    private Pin pin;

    @ManyToOne
    @JoinColumn(name = "hedieuhanh")
    private HeDieuHanh heDieuHanh;

    @ManyToOne
    @JoinColumn(name = "thuonghieu")
    private ThuongHieu thuongHieu;

    @ManyToOne
    @JoinColumn(name = "nhucausudung")
    private NhuCauSuDung nhuCauSuDung;

    @Column(name = "soluong")
    private int soLuong;

    @Column(name = "hinh")
    private String hinh;

    @Column(name = "tomtat")
    private String tomTat;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "sanPham")
    private Set<ChiTietHoaDon> listChiTietHoaDon = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "sanPham")
    private Set<BinhLuan> listBinhLuan = new HashSet<>();

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

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

    public CPU getCpu() {
        return cpu;
    }

    public void setCpu(CPU cpu) {
        this.cpu = cpu;
    }

    public OCung getoCung() {
        return oCung;
    }

    public void setoCung(OCung oCung) {
        this.oCung = oCung;
    }

    public RAM getRam() {
        return ram;
    }

    public void setRam(RAM ram) {
        this.ram = ram;
    }

    public CardDoHoa getCardDoHoa() {
        return cardDoHoa;
    }

    public void setCardDoHoa(CardDoHoa cardDoHoa) {
        this.cardDoHoa = cardDoHoa;
    }

    public ManHinh getManHinh() {
        return manHinh;
    }

    public void setManHinh(ManHinh manHinh) {
        this.manHinh = manHinh;
    }

    public Pin getPin() {
        return pin;
    }

    public void setPin(Pin pin) {
        this.pin = pin;
    }

    public HeDieuHanh getHeDieuHanh() {
        return heDieuHanh;
    }

    public void setHeDieuHanh(HeDieuHanh heDieuHanh) {
        this.heDieuHanh = heDieuHanh;
    }

    public ThuongHieu getThuongHieu() {
        return thuongHieu;
    }

    public void setThuongHieu(ThuongHieu thuongHieu) {
        this.thuongHieu = thuongHieu;
    }

    public NhuCauSuDung getNhuCauSuDung() {
        return nhuCauSuDung;
    }

    public void setNhuCauSuDung(NhuCauSuDung nhuCauSuDung) {
        this.nhuCauSuDung = nhuCauSuDung;
    }

    public Set<BinhLuan> getListBinhLuan() {
        return listBinhLuan;
    }

    public void setListBinhLuan(Set<BinhLuan> listBinhLuan) {
        this.listBinhLuan = listBinhLuan;
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
}
