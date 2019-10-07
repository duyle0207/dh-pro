package com.project.dhpro.controller;

import com.project.dhpro.models.*;
import com.project.dhpro.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/hung")
public class HungAPIController {
    @Autowired
    ThuongHieuService thuongHieuService;

    @GetMapping(value = "/thuongHieu")
    List<ThuongHieu> ListThuongHieu() {
        return thuongHieuService.getAll();
    }

    @Autowired
    PinService pinService;

    @GetMapping(value = "/pin")
    List<Pin> ListPin() {
        return pinService.getAll();
    }

    @Autowired
    HeDieuHanhService heDieuHanhService;

    @GetMapping(value = "/heDieuHanh")
    List<HeDieuHanh> ListHeDieuHanh() {
        return heDieuHanhService.getAll();
    }

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
}
