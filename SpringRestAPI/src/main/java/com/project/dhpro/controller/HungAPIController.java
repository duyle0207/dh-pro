package com.project.dhpro.controller;

import com.project.dhpro.models.*;
import com.project.dhpro.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
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

    @DeleteMapping(value="/deleteSanPham/{id}")
    public  ResponseEntity<SanPham> deleteSanPham(@PathVariable("id") int id)
    {
        System.out.println(id);
        sanPhamService.deleteSanPham(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/saveSanPham")
    public ResponseEntity<SanPham> updateAccount(@Valid @RequestBody SanPham sanPham) throws URISyntaxException {
        System.out.println(sanPham.getThuongHieu().getTenThuongHieu());
        SanPham sp = sanPhamService.save(sanPham);
        System.out.println("ID: "+sp.getThuongHieu().getTenThuongHieu());
        return ResponseEntity.created(new URI("/api/post" + sp.getId())).body(sp);
    }

    @PostMapping("/saveSanPham")
    public ResponseEntity<SanPham> insertAccount(@Valid @RequestBody SanPham sanPham) throws URISyntaxException {
        System.out.println(sanPham);
        SanPham sp = sanPhamService.save(sanPham);
        System.out.println("ID: "+sp.getId());
        return new ResponseEntity<SanPham>(sp,HttpStatus.OK);
    }

    private boolean checkFileName(String filename, String path)
    {
        File a = new File(path);
        for (File check: a.listFiles()) {
            if(check.getName().equals(filename))
            {
                return false;
            }
        }
        return true;
    }

    private String ChangeFileName(String filename, String fileNameRoot,String path)
    {
        int i = 1;
        int index = filename.length();
        String suffix = filename.substring(index-4,index);
        String prefix = filename.substring(0,index-4);
        while(!checkFileName(filename,path))
        {
            filename = fileNameRoot;
            filename = prefix + "(" + i + ")" + suffix;
            i++;
        }
        return filename;
    }

    private static final String UPLOAD_DIRECTORY ="/images";

    @PostMapping(value = "/savefile/{lapName}",consumes = {"multipart/form-data"})
    public ResponseEntity uploadFile(@RequestParam MultipartFile[] file, HttpSession session,@PathVariable("lapName") String lapName) throws IOException {
        ServletContext context = session.getServletContext();
        String path = context.getRealPath(UPLOAD_DIRECTORY);

        SanPham s = sanPhamService.findSanPhamByTenSP(lapName);

        System.out.println("IDSP: "+s.getId());

        for (MultipartFile a: file)
        {
            System.out.println(a.getOriginalFilename());
            String filename = a.getOriginalFilename();
            String fileNameRoot = a.getOriginalFilename();
            if(filename.endsWith(".jpg") || filename.endsWith(".png") || filename.endsWith(".jpeg"))
            {
                System.out.println('a');
                if(!checkFileName(filename,path))
                {
                    filename = ChangeFileName(filename,fileNameRoot,path);
                }
                System.out.println(path+" "+filename);
                byte[] bytes = a.getBytes();
                BufferedOutputStream stream =new BufferedOutputStream(new FileOutputStream(
                        new File(path + File.separator + filename)));

                System.out.println(bytes.length);

                if(bytes.length>92160060)
                {
                    return ResponseEntity.ok().build();
                }
                else
                {
                    SanPham sanPham = sanPhamService.findSanPhamByTenSP(lapName);
                    sanPham.setHinh(filename);
                    sanPhamService.save(sanPham);
                    stream.write(bytes);
                    stream.flush();
                    stream.close();
                }
            }
            else
            {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body("Error Message");
            }
        }
        return ResponseEntity.ok().build();
    }
}
