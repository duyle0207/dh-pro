package com.project.dhpro.controller;

import com.project.dhpro.jwt.JwtTokenProvider;
import com.project.dhpro.models.*;
import com.project.dhpro.payload.LoginResponse;
import com.project.dhpro.service.*;
import com.project.dhpro.ultils.CartUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

    List<TaiKhoan> ListTaiKhoan() {
        return taiKhoanService.getAll();
    }

    @PostMapping("/dangKi")
    public ResponseEntity<String> register(@Valid @RequestBody TaiKhoan taiKhoan) {
        for (TaiKhoan tk : ListTaiKhoan()) {
            if(tk.getUserName().equals(taiKhoan.getUserName()))
                return new ResponseEntity<String>("Username has already taken",HttpStatus.CONFLICT);
        }
        System.out.println(taiKhoan.toString());
        String encodedPassword = new BCryptPasswordEncoder().encode(taiKhoan.getPassword());
        taiKhoan.setPassword(encodedPassword);
        TaiKhoan tk = taiKhoanService.save(taiKhoan);
        return new ResponseEntity<String>(String.valueOf(tk.getRole()),HttpStatus.OK);
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

    //Cart
    @GetMapping(value="/shoppingCart")
    public Cart getShoppingCart(HttpServletRequest request)
    {
        Cart cart = CartUtils.getCart(request);

        double total = cart.setTotalCart();

        cart.setTotal(total);

        return cart;
    }

    @GetMapping(value = "/getAllQuantity")
    public int getAllQuantity(HttpServletRequest request)
    {
        Cart cart = CartUtils.getCart(request);

        return cart.getAllQuantity();
    }

    @GetMapping(value = "/getAmount")
    public double getAmount(HttpServletRequest request)
    {
        Cart cart = CartUtils.getCart(request);

        return cart.setTotalCart();
    }

    @PostMapping(value = "/addToCart/quantity={quantity}")
    public Cart addToCart(@Valid @RequestBody SanPham sanPham,
                          @PathVariable("quantity") int quantity,
                          HttpServletRequest request)
    {

        System.out.println(quantity);

        Cart cart = CartUtils.getCart(request);

        cart.saveProductToCart(sanPham,quantity);

        double total = cart.setTotalCart();

        cart.setTotal(total);

        return cart;
    }

    @PostMapping(value="/updateCart/quantity={quantity}")
    public Cart updateCart(@Valid @RequestBody SanPham sanPham,
                           @PathVariable("quantity") int quantity,
                           HttpServletRequest request)
    {
        Cart cart = CartUtils.getCart(request);

        cart.updateCart(sanPham,quantity);

        double total = cart.setTotalCart();

        cart.setTotal(total);

        return cart;
    }

    @DeleteMapping(value="/removeProduct/id={id}")
    public Cart removeProduct(HttpServletRequest request,@PathVariable("id") int id)
    {
        Cart cart = (Cart) request.getSession().getAttribute("myCart");

        SanPham sanPham = sanPhamService.findById(id);

        cart.removeProduct(sanPham);

        double total = cart.setTotalCart();

        cart.setTotal(total);

        return cart;
    }

    @GetMapping(value = "/getChoosableQuantity/{id}")
    public int checkProductQuantity(@PathVariable("id") int id,HttpServletRequest request)
    {

        int quantity = sanPhamService.findById(id).getSoLuong();

        Cart cart = CartUtils.getCart(request);

        if(cart.findCardLineInCart(id)==null)
        {
            return quantity;
        }
        int cartProductQuantity = cart.findCardLineInCart(id).getSoLuong();

        return Math.abs(quantity - cartProductQuantity);
    }

    @GetMapping(value = "/getProductQuantity/{id}")
    public int getProductQuantity(@PathVariable("id") int id, HttpServletRequest request)
    {
        int quantity = sanPhamService.findById(id).getSoLuong();

        return quantity;
    }

    // Hóa đơn
    @Autowired
    HoaDonService hoaDonService;

    @Autowired
    ChiTietHoaDonService chiTietHoaDonService;

    @GetMapping(value = "/chiTietHoaDon")
    List<ChiTietHoaDon> ListChiTietHoaDon() {
        return chiTietHoaDonService.getAll();
    }

    @GetMapping(value = "/hoaDon")
    List<HoaDon> ListHoaDon() {
        return hoaDonService.getAll();
    }

    @PostMapping(value = "/saveHoaDon")
    public ResponseEntity saveHoaDon(@Valid @RequestBody HoaDon hoaDon, HttpServletRequest request)
    {
        HoaDon hd = hoaDonService.save(hoaDon);

        Cart cart = CartUtils.getCart(request);

        for ( CartLine line: cart.getCartLines()) {

            SanPham sanPham = sanPhamService.findById(line.getSanPham().getId());

            ChiTietHoaDon chiTietHoaDon = new ChiTietHoaDon();

            chiTietHoaDon.setHoaDon(hd);
            chiTietHoaDon.setSanPham(sanPham);
            chiTietHoaDon.setDonGia((int) line.getTongTien());
            chiTietHoaDon.setSoLuong(line.getSoLuong());

            chiTietHoaDonService.save(chiTietHoaDon);
        }

        CartUtils.removeCart(request);

        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/getHoaDonByKhachHang")
    public List<HoaDon> getHoaDonByKhachHang(@Valid @RequestBody KhachHang khachHang)
    {
        return hoaDonService.getHoaDonByKhachHang(khachHang);
    }

    @GetMapping(value = "/getCTHD/{idhd}")
    public List<ChiTietHoaDon> getCTHD(@PathVariable("idhd") int idhd)
    {
        return chiTietHoaDonService.getChiTietHoaDonsByHoaDon(hoaDonService.getHoaDonByID(idhd));
    }

    //Tài khoản
    @Autowired
    KhachHangService khachHangService;

    @GetMapping(value="/getCustomerByUsername/{username}")
    public KhachHang getAlllTaiKhoan(@PathVariable String username)
    {
        TaiKhoan taiKhoan = taiKhoanService.findTaiKhoanByUserName(username);

        KhachHang khachHang = khachHangService.findKHByIDTaiKhoan(taiKhoan);

        return khachHang;
    }

    @GetMapping(value = "/getCustomerByTaiKhoanID/{id}")
    public KhachHang getCustomerByTaiKhoanId(@PathVariable("id") int id)
    {
        TaiKhoan taiKhoan = taiKhoanService.findById(id);
        KhachHang khachHang = khachHangService.findKHByIDTaiKhoan(taiKhoan);
        return khachHang;
    }

    // Phương thức thanh toán
    @Autowired
    PhuongThucThanhToanService phuongThucThanhToanService;

    @GetMapping(value = "/getPhuongThucThanhToan/{id}")
    public PhuongThucThanhToan getPTTTByID(@PathVariable("id") int id)
    {
        return phuongThucThanhToanService.getById(id);
    }

    //Bình luận
    @Autowired
    BinhLuanService binhLuanService;

    @GetMapping(value="/getBinhLuanBySPID/{id}")
    public List<BinhLuan> getBinhLuanBySPID(@PathVariable("id") int id)
    {
        return binhLuanService.getBinhLuansBySanPham(id);
    }
//
//    @GetMapping(value="/test/{id}")
//    public List<ChiTietHoaDon> getCTHDBySPID(@PathVariable("id") int id)
//    {
//        SanPham sanPham = sanPhamService.findById(id);
//        System.out.println(sanPham.getTenSP());
//        return chiTietHoaDonService.getChiTietHoaDonsBySanPham(sanPham);
//    }

//    @GetMapping(value="/getBinhLuanByID/{id}")
//    public BinhLuan getBinhLuanByID(@PathVariable("id") int id)
//    {
//        return binhLuanService.getBinhLuanById(id);
//    }
}
