package com.project.dhpro.controller;

import com.project.dhpro.models.*;
import com.project.dhpro.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/hung")
public class HungAPIController {
    @Autowired
    ThuongHieuService thuongHieuService;

    @GetMapping(value = "/listThuongHieu")
    List<ThuongHieu> ListThuongHieu() {
        return thuongHieuService.getAll();
    }

    @GetMapping(value = "/thuongHieu/{id}")
    ThuongHieu getThuongHieuById(@PathVariable("id") int id){return thuongHieuService.findById(id);}

    @Autowired
    PinService pinService;

    @GetMapping(value = "/listPin")
    List<Pin> ListPin() {
        return pinService.getAll();
    }

    @GetMapping(value = "/pin/{id}")
    Pin getPinById(@PathVariable("id") int id)
    {
        return pinService.findById(id);
    }

    @Autowired
    HeDieuHanhService heDieuHanhService;

    @GetMapping(value = "/listHeDieuHanh")
    List<HeDieuHanh> ListHeDieuHanh() {
        return heDieuHanhService.getAll();
    }

    @GetMapping(value = "/heDieuHanh/{id}")
    HeDieuHanh findById(@PathVariable("id") int id){return heDieuHanhService.findById(id);}

    @Autowired
    PhuongThucThanhToanService phuongThucThanhToanService;

    @GetMapping(value = "/phuongThucThanhToan")
    List<PhuongThucThanhToan> ListPhuongThucThanhToan() {
        return phuongThucThanhToanService.getAll();
    }

    @Autowired
    CardDoHoaService cardDoHoaService;

    @GetMapping(value = "/cardDoHoa")
    List<CardDoHoa> ListCardDoHoa() {
        return  cardDoHoaService.getAll();
    }

    @Autowired
    SanPhamService sanPhamService;

    @GetMapping(value = "/sanPham")
    List<SanPham> ListSanPham() {
        return  sanPhamService.getAll();
    }

    @Autowired
    MoTaSanPhamService moTaSanPhamService;

    @GetMapping(value = "/moTaSanPham")
    List<MoTaSanPham> ListMoTaSanPham() {
        return moTaSanPhamService.getAll();
    }

    @Autowired
    HinhSanPhamService hinhSanPhamService;

    @GetMapping(value = "/hinhSanPham")
    List<HinhSanPham> ListHinhSanPham() {
        return hinhSanPhamService.getAll();
    }

    @Autowired
    ChiTietHoaDonService chiTietHoaDonService;

    @GetMapping(value = "/chiTietHoaDon")
    List<ChiTietHoaDon> ListChiTietHoaDon() {
        return chiTietHoaDonService.getAll();
    }

    @Autowired
    BinhLuanService binhLuanService;

    @GetMapping(value = "/binhLuan")
    List<BinhLuan> ListBinhLuan() {
        return binhLuanService.getAll();
    }

    @Autowired
    RoleService roleService;

    @GetMapping(value = "/role")
    List<Role> ListRole() {
        return roleService.getAll();
    }

    @Autowired
    TaiKhoanService taiKhoanService;

    @GetMapping(value = "/taiKhoan")
    List<TaiKhoan> ListTaiKhoan() {
        return taiKhoanService.getAll();
    }

    @Autowired
    QuanTriVienService quanTriVienService;

    @GetMapping(value = "/quanTriVien")
    List<QuanTriVien> ListQuanTriVien() {
        return quanTriVienService.getAll();
    }

    @Autowired
    KhachHangService khachHangService;

    @GetMapping(value = "/khachHang")
    List<KhachHang> ListKhachHang() {
        return khachHangService.getAll();
    }

    @Autowired
    HoaDonService hoaDonService;

    @GetMapping(value = "/hoaDon")
    List<HoaDon> ListHoaDon() {
        return hoaDonService.getAll();
    }

    @PutMapping("/saveSanPham")
    public ResponseEntity<SanPham> updateAccount(@Valid @RequestBody SanPham sanPham) throws URISyntaxException {
        System.out.println(sanPham.getThuongHieu().getTenThuongHieu());
        SanPham sp = sanPhamService.save(sanPham);
        System.out.println("ID: "+sp.getThuongHieu().getTenThuongHieu());
        return ResponseEntity.created(new URI("/api/post" + sp.getId())).body(sp);
    }
}
