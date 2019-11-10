package com.project.dhpro.controller;

import com.project.dhpro.jwt.JwtTokenProvider;
import com.project.dhpro.models.*;
import com.project.dhpro.payload.LoginResponse;
import com.project.dhpro.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;

@RestController
    @RequestMapping("/customerUnauthenticated")
public class CustomerUnauthenticatedController {

    // Sản phẫm
    @Autowired
    SanPhamService sanPhamService;

    @Autowired
    HinhSanPhamService hinhSanPhamService;

    @GetMapping(value = "/sanPham")
    List<SanPham> ListSanPham() {
        return  sanPhamService.getAll();
    }

    @GetMapping(value = "/sanPham/{id}")
    SanPham getSPByID(@PathVariable("id") int id)
    {
        return sanPhamService.findById(id);
    }

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

    @GetMapping(value = "/getHinhSP/{idsp}")
    List<HinhSanPham> getHinhSPsByID(@PathVariable("idsp") int idsp)
    {
        return hinhSanPhamService.getHinhSanPhamsByIdSP(idsp);
    }

    //Thương hiệu
    @Autowired
    ThuongHieuService thuongHieuService;

    @GetMapping(value = "/listThuongHieu")
    List<ThuongHieu> ListThuongHieu() {
        return thuongHieuService.getAll();
    }

    //Hệ điều hành
    @Autowired
    HeDieuHanhService heDieuHanhService;

    @GetMapping(value = "/listHeDieuHanh")
    List<HeDieuHanh> ListHeDieuHanh() {
        return heDieuHanhService.getAll();
    }

    //RAM
    @Autowired
    RAMService ramService;

    @GetMapping(value = "/listRam")
    List<RAM> listRAM() {
        return ramService.findAll();
    }

    //CPU
    @Autowired
    CPUService cpuService;

    @GetMapping(value = "/listCPU")
    List<CPU> listCPU() {
        return cpuService.findAll();
    }

    //OCung
    @Autowired
    OCungService oCungService;

    @GetMapping(value = "/listOCung")
    List<OCung> listOCung() {
        return oCungService.findAll();
    }

    //Card đồ họa
    @Autowired
    CardDoHoaService cardDoHoaService;

    @GetMapping(value = "/listCardDoHoa")
    List<CardDoHoa> ListCardDoHoa() {
        return  cardDoHoaService.getAll();
    }

    //Nhu cầu sử dụng
    @Autowired
    NhuCauSuDungService nhuCauSuDungService;

    @GetMapping(value = "/listNhuCauSuDung")
    List<NhuCauSuDung> listNhuCauSuDung() {
        return nhuCauSuDungService.findAll();
    }

    //Login

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    TaiKhoanService taiKhoanService;

    @PostMapping("/login")
    public LoginResponse authenticateUser(@RequestParam(name = "username") String username, @RequestParam(name = "password") String password) {
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

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setAuthorities((Collection<GrantedAuthority>) authentication.getAuthorities());
        loginResponse.setUserName(authentication.getName());
        loginResponse.setAccessToken(jwt);

        System.out.println(authentication.getPrincipal());

        return loginResponse;
    }

    @RequestMapping(value="/logout", method = RequestMethod.GET)
    ResponseEntity logout(HttpServletRequest request, HttpServletResponse response)
    {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null){
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }

        return ResponseEntity.ok().build();
    }

    //San Pham

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
        return new ResponseEntity<SanPham>(sp, HttpStatus.OK);
    }
}
