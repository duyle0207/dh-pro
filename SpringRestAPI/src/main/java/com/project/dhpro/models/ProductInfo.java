package com.project.dhpro.models;

import java.util.HashSet;
import java.util.Set;

public class ProductInfo {

    private int id;

    private String tenSP;

    private int gia;

    private String mauSac;

    private float trongLuong;

    private String kichThuoc;

    private String amThanh;

    private String congGiaoTiep;

    private String doPhanGiaiWC;

    private CPU cpu;

    private OCung oCung;

    private RAM ram;

    private CardDoHoa cardDoHoa;

    private ManHinh manHinh;

    private Pin pin;

    private HeDieuHanh heDieuHanh;

    private ThuongHieu thuongHieu;

    private NhuCauSuDung nhuCauSuDung;

    private int soLuong;

    private String hinh;

    private String tomTat;

    private Set<ChiTietHoaDon> listChiTietHoaDon = new HashSet<>();

    private Set<BinhLuan> listBinhLuan = new HashSet<>();

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

    public Set<ChiTietHoaDon> getListChiTietHoaDon() {
        return listChiTietHoaDon;
    }

    public void setListChiTietHoaDon(Set<ChiTietHoaDon> listChiTietHoaDon) {
        this.listChiTietHoaDon = listChiTietHoaDon;
    }

    public Set<BinhLuan> getListBinhLuan() {
        return listBinhLuan;
    }

    public void setListBinhLuan(Set<BinhLuan> listBinhLuan) {
        this.listBinhLuan = listBinhLuan;
    }
}
