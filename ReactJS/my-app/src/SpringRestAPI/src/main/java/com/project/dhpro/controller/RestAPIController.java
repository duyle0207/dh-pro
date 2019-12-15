package com.project.dhpro.controller;

import com.project.dhpro.jwt.JwtTokenProvider;
import com.project.dhpro.models.*;
import com.project.dhpro.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
public class RestAPIController {

    @Autowired
    RAMService ramService;

    @Autowired
    NhuCauSuDungService nhuCauSuDungService;

    @Autowired
    ManHinhService manHinhService;

    @Autowired
    CPUService cpuService;

    @Autowired
    OCungService oCungService;

    @Autowired
    SanPhamService sanPhamService;

    @Autowired
    CardDoHoaService cardDoHoaService;

    @GetMapping(value = "/listRam")
    List<RAM> listRAM() {
        return ramService.findAll();
    }

    @GetMapping(value = "/ram/{id}")
    RAM getRAM(@PathVariable("id") int id) {
        return ramService.findById(id);
    }

    @GetMapping(value = "/listNhuCauSuDung")
    List<NhuCauSuDung> listNhuCauSuDung() {
        return nhuCauSuDungService.findAll();
    }

    @GetMapping(value = "/nhuCauSuDung/{id}")
    NhuCauSuDung findById(@PathVariable("id") int id) {
        return nhuCauSuDungService.findById(id);
    }

    @GetMapping(value = "/listManHinh")
    List<ManHinh> listManHinh() {
        return manHinhService.findAll();
    }

    @GetMapping(value = "/listCPU")
    List<CPU> listCPU() {
        return cpuService.findAll();
    }

    @GetMapping(value = "/listOCung")
    List<OCung> listOCung() {
        return oCungService.findAll();
    }

    @GetMapping(value = "/oCung/{id}")
    OCung getOCungById(@PathVariable("id") int id) {
        return oCungService.findOCungById(id);
    }

    @GetMapping(value = "/sanPham/{id}")
    SanPham getSanPhamById(@PathVariable("id") int id) {
        SanPham sp = new SanPham();
        try {
            sp = sanPhamService.findById(id);
        } catch (Exception e) {
            return sp;
        }
        return sp;
    }

    @GetMapping(value = "/cpu/{id}")
    CPU getCPUById(@PathVariable("id") int id) {
        return cpuService.findCPUById(id);
    }

    @GetMapping(value = "/cardDoHoa/{id}")
    CardDoHoa getCardById(@PathVariable("id") int id) {
        return cardDoHoaService.findCardById(id);
    }

    @GetMapping(value = "/manHinh/{id}")
    ManHinh getManHinhById(@PathVariable("id") int id) {
        return manHinhService.findById(id);
    };

    @PostMapping(value = "/searchSPAdmin")
    List<SanPham> searchSanPhamAdmin(@Valid @RequestBody String keyword) {
        System.out.println(keyword);
        return sanPhamService.searchSanPhamAdmin(keyword);
    }

    @PostMapping(value = "/searchSPKH")
    List<SanPham> searchSanPhamKH(@Valid @RequestBody String keyword) {
        System.out.println(keyword);
        return sanPhamService.searchSanPhamKH(keyword);
    }

    @PostMapping(value="/updateStatusSanPham/{id}")
    public ResponseEntity updateStatusSP(@PathVariable("id") int id)
    {
        SanPham sp = sanPhamService.findById(id);
        sp.setStatus(!sp.getStatus());

        sanPhamService.save(sp);

        return ResponseEntity.ok().build();
    }

    //Card
    @GetMapping(value="/getCard/page={page}")
    List<CardDoHoa> getAllCard(@PathVariable("page") int page)
    {
        Pageable pageable = PageRequest.of(page-1, 6);
        List<CardDoHoa> list = null;
        try {
            Page<CardDoHoa> pageCard = cardDoHoaService.findAll(pageable);
            list = pageCard.getContent();
//            list.add(page);
            System.out.println(pageCard.getTotalPages());
        }
        catch (Exception e)
        {
            return null;
        }
        return list;
    }

    @GetMapping(value = "/getTotalPages")
    public int getTotalPages()
    {
        Pageable pageable = PageRequest.of(0, 6);
        Page<CardDoHoa> pageCard = cardDoHoaService.findAll(pageable);

        return pageCard.getTotalPages();
    }

    @PostMapping(value="/insertCard")
    public ResponseEntity insertCard(@Valid @RequestBody CardDoHoa cardDoHoa)
    {
        System.out.println(cardDoHoa.getTenCardDoHoa());
        cardDoHoaService.save(cardDoHoa);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value="/insertCard")
    public ResponseEntity updatetCard(@Valid @RequestBody CardDoHoa cardDoHoa)
    {
        System.out.println(cardDoHoa.getTenCardDoHoa());
        cardDoHoaService.save(cardDoHoa);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/deleteCard/{id}")
    public ResponseEntity deleteCard(@PathVariable("id") int id)
    {
        cardDoHoaService.remove(id);

        return ResponseEntity.ok().build();
    }

    //CPU
    @GetMapping(value="/getCPU/page={page}")
    List<CPU> getAllCPU(@PathVariable("page") int page)
    {
        Pageable pageable = PageRequest.of(page-1, 6);
        List<CPU> list = null;
        try {
            Page<CPU> pageCard = cpuService.getAll(pageable);
            list = pageCard.getContent();
            System.out.println(pageCard.getTotalPages());
        }
        catch (Exception e)
        {
            return null;
        }
        return list;
    }

    @GetMapping(value = "/getTotalPagesCPU")
    public int getTotalPagesCPU()
    {
        Pageable pageable = PageRequest.of(0, 6);
        Page<CPU> pageCard = cpuService.getAll(pageable);

        return pageCard.getTotalPages();
    }

    @PostMapping(value="/insertCPU")
    public  ResponseEntity insertCPU(@Valid @RequestBody CPU cpu)
    {
        cpuService.save(cpu);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value="/insertCPU")
    public  ResponseEntity updateCPU(@Valid @RequestBody CPU cpu)
    {
        cpuService.save(cpu);
        return ResponseEntity.ok().build();
    }

    //Hệ điều hành
    @Autowired
    HeDieuHanhService heDieuHanhService;
    @GetMapping(value="/getHDH/page={page}")
    List<HeDieuHanh> getAllHeDieuHanh(@PathVariable("page") int page)
    {
        Pageable pageable = PageRequest.of(page-1, 6);
        List<HeDieuHanh> list = null;
        try {
            Page<HeDieuHanh> pageCard = heDieuHanhService.findAll(pageable);
            list = pageCard.getContent();
            System.out.println(pageCard.getTotalPages());
        }
        catch (Exception e)
        {
            return null;
        }
        return list;
    }

    @GetMapping(value = "/getTotalPagesHDH")
    public int getTotalPagesHDH()
    {
        Pageable pageable = PageRequest.of(0, 6);
        Page<HeDieuHanh> pageCard = heDieuHanhService.findAll(pageable);

        return pageCard.getTotalPages();
    }

    @GetMapping(value = "/heDieuHanh/{id}")
    HeDieuHanh findHDHById(@PathVariable("id") int id){return heDieuHanhService.findById(id);}

    @PostMapping(value="/insertHDH")
    public ResponseEntity insertHDH(@Valid @RequestBody HeDieuHanh heDieuHanh)
    {
        heDieuHanhService.save(heDieuHanh);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value="/insertHDH")
    public ResponseEntity updateHDH(@Valid @RequestBody HeDieuHanh heDieuHanh)
    {
        System.out.println(heDieuHanh.getTenHeDieuHanh());
        heDieuHanhService.save(heDieuHanh);
        return ResponseEntity.ok().build();
    }

    //Màn hình
    @GetMapping(value="/getManHinh/page={page}")
    List<ManHinh> getAllManHinh(@PathVariable("page") int page)
    {
        Pageable pageable = PageRequest.of(page-1, 6);
        List<ManHinh> list = null;
        try {
            Page<ManHinh> pageCard = manHinhService.getAll(pageable);
            list = pageCard.getContent();
            System.out.println(pageCard.getTotalPages());
        }
        catch (Exception e)
        {
            return null;
        }
        return list;
    }

    @GetMapping(value = "/getTotalPagesManHinh")
    public int getTotalPagesManHinh()
    {
        Pageable pageable = PageRequest.of(0, 6);
        Page<ManHinh> pageCard = manHinhService.getAll(pageable);

        return pageCard.getTotalPages();
    }

    @PostMapping(value="/insertManHinh")
    public ResponseEntity insertManHinh(@Valid @RequestBody ManHinh manHinh)
    {
        manHinhService.save(manHinh);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value="/insertManHinh")
    public ResponseEntity updateNhuCauSuDung(@Valid @RequestBody ManHinh manHinh)
    {
        manHinhService.save(manHinh);
        return ResponseEntity.ok().build();
    }

    //Nhu cau su dung
    @GetMapping(value="/getNhuCauSuDung/page={page}")
    List<NhuCauSuDung> getAllNhuCauSuDung(@PathVariable("page") int page)
    {
        Pageable pageable = PageRequest.of(page-1, 6);
        List<NhuCauSuDung> list = null;
        try {
            Page<NhuCauSuDung> pageCard = nhuCauSuDungService.getAll(pageable);
            list = pageCard.getContent();
            System.out.println(pageCard.getTotalPages());
        }
        catch (Exception e)
        {
            return null;
        }
        return list;
    }

    @GetMapping(value = "/getTotalPagesNhuCauSuDung")
    public int getTotalPagesNhuCauSuDung()
    {
        Pageable pageable = PageRequest.of(0, 6);
        Page<NhuCauSuDung> pageCard = nhuCauSuDungService.getAll(pageable);

        return pageCard.getTotalPages();
    }

    @PostMapping(value="/insertNhuCauSuDung")
    public ResponseEntity insertNhuCauSuDung(@Valid @RequestBody NhuCauSuDung nhuCauSuDung)
    {
        nhuCauSuDungService.save(nhuCauSuDung);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value="/insertNhuCauSuDung")
    public ResponseEntity updateNhuCauSuDung(@Valid @RequestBody NhuCauSuDung nhuCauSuDung)
    {
        nhuCauSuDungService.save(nhuCauSuDung);
        return ResponseEntity.ok().build();
    }

    //OCung
    @GetMapping(value="/getOCung/page={page}")
    List<OCung> getAllOCung(@PathVariable("page") int page)
    {
        Pageable pageable = PageRequest.of(page-1, 6);
        List<OCung> list = null;
        try {
            Page<OCung> pageCard = oCungService.getAll(pageable);
            list = pageCard.getContent();
            System.out.println(pageCard.getTotalPages());
        }
        catch (Exception e)
        {
            return null;
        }
        return list;
    }

    @GetMapping(value = "/getTotalPagesOCung")
    public int getTotalPagesOCung()
    {
        Pageable pageable = PageRequest.of(0, 6);
        Page<OCung> pageCard = oCungService.getAll(pageable);

        return pageCard.getTotalPages();
    }

    @PostMapping(value="/insertOCung")
    public ResponseEntity insertOCung(@Valid @RequestBody OCung oCung)
    {
        oCungService.save(oCung);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value="/insertOCung")
    public ResponseEntity updateOCung(@Valid @RequestBody OCung oCung)
    {
        oCungService.save(oCung);
        return ResponseEntity.ok().build();
    }

    //Pin
    @Autowired
    PinService pinService;
    @GetMapping(value="/getPin/page={page}")
    List<Pin> getAllPin(@PathVariable("page") int page)
    {
        Pageable pageable = PageRequest.of(page-1, 6);
        List<Pin> list = null;
        try {
            Page<Pin> pageCard = pinService.getAll(pageable);
            list = pageCard.getContent();
            System.out.println(pageCard.getTotalPages());
        }
        catch (Exception e)
        {
            return null;
        }
        return list;
    }

    @GetMapping(value = "/getTotalPagesPin")
    public int getTotalPagesPin()
    {
        Pageable pageable = PageRequest.of(0, 6);
        Page<Pin> pageCard = pinService.getAll(pageable);

        return pageCard.getTotalPages();
    }

    @PostMapping(value="/insertPin")
    public ResponseEntity insertOCung(@Valid @RequestBody Pin pin)
    {
        pinService.save(pin);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value="/insertPin")
    public ResponseEntity updateOCung(@Valid @RequestBody Pin pin)
    {
        pinService.save(pin);
        return ResponseEntity.ok().build();
    }

    //RAM
    @GetMapping(value="/getRAM/page={page}")
    List<RAM> getAllRAM(@PathVariable("page") int page)
    {
        Pageable pageable = PageRequest.of(page-1, 6);
        List<RAM> list = null;
        try {
            Page<RAM> pageCard = ramService.getAll(pageable);
            list = pageCard.getContent();
            System.out.println(pageCard.getTotalPages());
        }
        catch (Exception e)
        {
            return null;
        }
        return list;
    }

    @GetMapping(value = "/getTotalPagesRAM")
    public int getTotalPagesRAM()
    {
        Pageable pageable = PageRequest.of(0, 6);
        Page<RAM> pageCard = ramService.getAll(pageable);

        return pageCard.getTotalPages();
    }

    @PostMapping(value="/insertRAM")
    public ResponseEntity insertRAM(@Valid @RequestBody RAM ram)
    {
        ramService.save(ram);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value="/insertRAM")
    public ResponseEntity updateRAM(@Valid @RequestBody RAM ram)
    {
        ramService.save(ram);
        return ResponseEntity.ok().build();
    }

    // Thương hiệu
    @Autowired
    ThuongHieuService thuongHieuService;

    @GetMapping(value="/getThuongHieu/page={page}")
    List<ThuongHieu> getAllThuongHieu(@PathVariable("page") int page)
    {
        Pageable pageable = PageRequest.of(page-1, 6);
        List<ThuongHieu> list = null;
        try {
            Page<ThuongHieu> pageCard = thuongHieuService.findAll(pageable);
            list = pageCard.getContent();
            System.out.println(pageCard.getTotalPages());
        }
        catch (Exception e)
        {
            return null;
        }
        return list;
    }

    @GetMapping(value = "/getTotalPagesThuongHieu")
    public int getTotalPagesThuongHieu()
    {
        Pageable pageable = PageRequest.of(0, 6);
        Page<ThuongHieu> pageCard = thuongHieuService.findAll(pageable);

        return pageCard.getTotalPages();
    }

    @PostMapping(value="/insertThuongHieu")
    public ResponseEntity insertThuongHieu(@Valid @RequestBody ThuongHieu thuongHieu)
    {
        thuongHieuService.save(thuongHieu);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value="/insertThuongHieu")
    public ResponseEntity updateRAM(@Valid @RequestBody ThuongHieu thuongHieu)
    {
        thuongHieuService.save(thuongHieu);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/thuongHieu/{id}")
    ThuongHieu getThuongHieuById(@PathVariable("id") int id){return thuongHieuService.findById(id);}


    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    TaiKhoanService taiKhoanService;

    @PostMapping("/login")
    public ResponseEntity authenticateUser(@RequestParam(name = "username") String username, @RequestParam(name = "password") String password) {
        System.out.println("Login");
        // Xác thực từ username và password.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        password
                )
        );

        System.out.println(authentication.getPrincipal());

        // Nếu không xảy ra exception tức là thông tin hợp lệ
        // Set thông tin authentication vào Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);

//        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        int id = taiKhoanService.findTaiKhoanByUserName(authentication.getName()).getId();
        // Trả về jwt cho người dùng.
        String jwt = tokenProvider.generateToken(id);

        System.out.println(jwt);


        return ResponseEntity.ok().build();
    }

    @Autowired
    KhachHangService khachHangService;

    @PutMapping(value = "/updateKH")
    public KhachHang updateKhachHang(@Valid @RequestBody KhachHang khachHang)
    {
        TaiKhoan taiKhoan = taiKhoanService.findTaiKhoanByUserName(khachHang.getTaiKhoan().getUserName());
        if(!khachHang.getTaiKhoan().getPassword().equals(taiKhoan.getPassword()))
        {
            khachHang.getTaiKhoan().setPassword(BCrypt.hashpw(khachHang.getTaiKhoan().getPassword(),BCrypt.gensalt(12)));
            taiKhoanService.save(khachHang.getTaiKhoan());
        }

        System.out.println("Mật khẫu: "+khachHang.getTaiKhoan().getPassword());

        return khachHangService.save(khachHang);
    }

    @GetMapping(value = "/comparePassword/{username}/{pwd}")
    public boolean comparePassword(@PathVariable("pwd") String pwd, @PathVariable("username") String username)
    {
        TaiKhoan taiKhoan = taiKhoanService.findTaiKhoanByUserName(username);
        return BCrypt.checkpw(pwd, taiKhoan.getPassword());
    }

    @Autowired
    HoaDonService hoaDonService;

    @PutMapping(value = "/confirmOrder")
    public HoaDon confirmOrder(@RequestBody String orderId) {
        HoaDon hoaDon = hoaDonService.getHoaDonByID(Integer.parseInt(orderId));
        hoaDon.setTinhTrang("Đã xác nhận");
        return hoaDonService.save(hoaDon);
    }

    @GetMapping(value = "/getStatistic")
    public ArrayList<Double> getStatistic(){
        ArrayList<Double> result = new ArrayList<>();
        result.add(hoaDonService.totalSalesOfMonth());
        result.add(Double.valueOf(hoaDonService.totalOrdersOfMonth()));
        result.add(Double.valueOf(khachHangService.totalCustomers()));
        return result;
    }

    @GetMapping(value = "/chartDay")
    public List<Object[]> chartValue(){
        return hoaDonService.saleDaysInMonth();
    }

    @GetMapping(value = "/chartMonth")
    public List<Object[]> chartMonth(){
        return hoaDonService.saleMonthsInYear();
    }

    @GetMapping(value = "/hotAndNot")
    public List<Object[]> hotAndNot(){
        return sanPhamService.hotAndNot();
    }

    // Binh luan
    @Autowired
    BinhLuanService binhLuanService;

    @PostMapping(value = "/insertBinhLuan")
    ResponseEntity insertBinhLuan(@Valid @RequestBody BinhLuan binhLuan)
    {
        System.out.println(binhLuan.getIdSP());
        System.out.println(binhLuan.getIdkh());
        binhLuanService.save(binhLuan);
        return ResponseEntity.ok().build();
    }

}
