package com.dhpro.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sanpham")
public class SanPham {
    @Id
    @Column(name = "id")
    private int Id;

    @Column(name = "tensp")
    private String TenSP;

    @Column(name = "gia")
    private int Gia;

    @Column(name="mausao")
    private String MauSac;

    @Column(name="trongluong")
    private float TrongLuong;

    @Column(name="kichthuoc")
    private String KichThuoc;

    @Column(name="amtham")
    private String AmThanh;

    @Column(name="congiaotiep")
    private String CongGiaoTiep;

    @Column(name="dophangiaiwc")
    private String DoPhanGiaiWC;

    @Column(name="dophangiai")
    private String dophangia;

    @Column(name="cpu")
    private int CPU_ID;

    private CPU CPUObjetc;

    @Column(name="ocung")
    private int OCung_ID;

    private OCung OCungObject;

    @Column(name="ram")
    private int RAM_ID;

    private RAM RAMObject;

    @Column(name="carddohoa")
    private int CardDoHoa_ID;

    private CardDoHoa CardDoHoaObject;

    @Column(name="manhinh")
    private int ManHinh_ID;

    private ManHinh ManHinhObject;

    @Column(name="pin")
    private int PIN_ID;

    private  Pin PinObject;

    @Column(name="hedieuhanh")
    private  int HeDieuHanh_ID;

    private  HeDieuHanh HeDieuHanhObject;

    @Column(name="thuonghieu")
    private  int ThuongHieu_ID;

    private ThuongHieu ThuongHieuObject;

    @Column(name="nhucausudung")
    private  int NhuCauSuDung_ID;

    private NhuCauSuDung NhuCauSuDungObject;

    @Column(name="soluong")
    private int SoLuong;

    @Column(name="hinh")
    private String Hinh;

    @Column(name = "tomtat")
    private String TomTat;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        this.Id = id;
    }

    public String getTenSP() {
        return TenSP;
    }

    public void setTenSP(String tenSP) {
        TenSP = tenSP;
    }

    public int getGia() {
        return Gia;
    }

    public void setGia(int gia) {
        Gia = gia;
    }

    public String getMauSac() {
        return MauSac;
    }

    public void setMauSac(String mauSac) {
        MauSac = mauSac;
    }

    public float getTrongLuong() {
        return TrongLuong;
    }

    public void setTrongLuong(float trongLuong) {
        TrongLuong = trongLuong;
    }

    public String getKichThuoc() {
        return KichThuoc;
    }

    public void setKichThuoc(String kichThuoc) {
        KichThuoc = kichThuoc;
    }

    public String getAmThanh() {
        return AmThanh;
    }

    public void setAmThanh(String amThanh) {
        AmThanh = amThanh;
    }

    public String getCongGiaoTiep() {
        return CongGiaoTiep;
    }

    public void setCongGiaoTiep(String congGiaoTiep) {
        CongGiaoTiep = congGiaoTiep;
    }

    public String getDoPhanGiaiWC() {
        return DoPhanGiaiWC;
    }

    public void setDoPhanGiaiWC(String doPhanGiaiWC) {
        DoPhanGiaiWC = doPhanGiaiWC;
    }

    public String getDophangia() {
        return dophangia;
    }

    public void setDophangia(String dophangia) {
        this.dophangia = dophangia;
    }

    public int getCPU_ID() {
        return CPU_ID;
    }

    public void setCPU_ID(int CPU_ID) {
        this.CPU_ID = CPU_ID;
    }

    public CPU getCPUObjetc() {
        return CPUObjetc;
    }

    public void setCPUObjetc(CPU CPUObjetc) {
        this.CPUObjetc = CPUObjetc;
    }

    public int getOCung_ID() {
        return OCung_ID;
    }

    public void setOCung_ID(int OCung_ID) {
        this.OCung_ID = OCung_ID;
    }

    public OCung getOCungObject() {
        return OCungObject;
    }

    public void setOCungObject(OCung OCungObject) {
        this.OCungObject = OCungObject;
    }

    public int getRAM_ID() {
        return RAM_ID;
    }

    public void setRAM_ID(int RAM_ID) {
        this.RAM_ID = RAM_ID;
    }

    public RAM getRAMObject() {
        return RAMObject;
    }

    public void setRAMObject(RAM RAMObject) {
        this.RAMObject = RAMObject;
    }

    public int getCardDoHoa_ID() {
        return CardDoHoa_ID;
    }

    public void setCardDoHoa_ID(int cardDoHoa_ID) {
        CardDoHoa_ID = cardDoHoa_ID;
    }

    public CardDoHoa getCardDoHoaObject() {
        return CardDoHoaObject;
    }

    public void setCardDoHoaObject(CardDoHoa cardDoHoaObject) {
        CardDoHoaObject = cardDoHoaObject;
    }

    public int getManHinh_ID() {
        return ManHinh_ID;
    }

    public void setManHinh_ID(int manHinh_ID) {
        ManHinh_ID = manHinh_ID;
    }

    public ManHinh getManHinhObject() {
        return ManHinhObject;
    }

    public void setManHinhObject(ManHinh manHinhObject) {
        ManHinhObject = manHinhObject;
    }

    public int getPIN_ID() {
        return PIN_ID;
    }

    public void setPIN_ID(int PIN_ID) {
        this.PIN_ID = PIN_ID;
    }

    public Pin getPinObject() {
        return PinObject;
    }

    public void setPinObject(Pin pinObject) {
        PinObject = pinObject;
    }

    public int getHeDieuHanh_ID() {
        return HeDieuHanh_ID;
    }

    public void setHeDieuHanh_ID(int heDieuHanh_ID) {
        HeDieuHanh_ID = heDieuHanh_ID;
    }

    public HeDieuHanh getHeDieuHanhObject() {
        return HeDieuHanhObject;
    }

    public void setHeDieuHanhObject(HeDieuHanh heDieuHanhObject) {
        HeDieuHanhObject = heDieuHanhObject;
    }

    public int getThuongHieu_ID() {
        return ThuongHieu_ID;
    }

    public void setThuongHieu_ID(int thuongHieu_ID) {
        ThuongHieu_ID = thuongHieu_ID;
    }

    public ThuongHieu getThuongHieuObject() {
        return ThuongHieuObject;
    }

    public void setThuongHieuObject(ThuongHieu thuongHieuObject) {
        ThuongHieuObject = thuongHieuObject;
    }

    public int getNhuCauSuDung_ID() {
        return NhuCauSuDung_ID;
    }

    public void setNhuCauSuDung_ID(int nhuCauSuDung_ID) {
        NhuCauSuDung_ID = nhuCauSuDung_ID;
    }

    public NhuCauSuDung getNhuCauSuDungObject() {
        return NhuCauSuDungObject;
    }

    public void setNhuCauSuDungObject(NhuCauSuDung nhuCauSuDungObject) {
        NhuCauSuDungObject = nhuCauSuDungObject;
    }

    public int getSoLuong() {
        return SoLuong;
    }

    public void setSoLuong(int soLuong) {
        SoLuong = soLuong;
    }

    public String getHinh() {
        return Hinh;
    }

    public void setHinh(String hinh) {
        Hinh = hinh;
    }

    public String getTomTat() {
        return TomTat;
    }

    public void setTomTat(String tomTat) {
        TomTat = tomTat;
    }
}
