package com.project.dhpro.controller;

import com.project.dhpro.jwt.JwtTokenProvider;
import com.project.dhpro.models.*;
import com.project.dhpro.payload.LoginResponse;
import com.project.dhpro.service.*;
import com.project.dhpro.ultils.CartUtils;
import com.project.dhpro.ultils.VNCharacterUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Locale;

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

    //Card đồ họadangKi
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
//        System.out.println("Login");

        // Xác thực từ username và password.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        password
                )
        );
        System.out.println("AUTHENTICATED");
        System.out.println(authentication);

        // Nếu không xảy ra exception tức là thông tin hợp lệ
        // Set thông tin authentication vào Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);

//        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        int id = taiKhoanService.findTaiKhoanByUserName(authentication.getName()).getId();
        // Trả về jwt cho người dùng.
        String jwt = tokenProvider.generateToken(id);

        String refreshToken = tokenProvider.generateRefreshToken(id);

        System.out.println("Access token: "+jwt);
        System.out.println("Refresh token: "+refreshToken);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setAuthorities((Collection<GrantedAuthority>) authentication.getAuthorities());
        loginResponse.setUserName(authentication.getName());
        loginResponse.setAccessToken(jwt);
        loginResponse.setRefreshToken(refreshToken);
        loginResponse.setId(id);
        System.out.println(authentication.getAuthorities());
        loginResponse.setSocialAccount(false);

        if(!(taiKhoanService.findById(id).getRole().getTenRole()).equals("Admin")) {
            loginResponse.setCustomerName(khachHangService.findKHByIDTaiKhoan(taiKhoanService.findById(id)).getTen());
        }

        System.out.println(authentication.getPrincipal());

        return loginResponse;
    }

    @GetMapping(value = "/validateJWT/{jwt}")
    boolean validateJWT(@PathVariable("jwt") String jwt)
    {
        return tokenProvider.validateToken(jwt);
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
        return new ResponseEntity<String>(String.valueOf(tk.getId()),HttpStatus.OK);
    }

    @PutMapping("/updateSocialAccount")
    ResponseEntity saveSocialAccount(@Valid @RequestBody TaiKhoan taiKhoan)
    {
        System.out.println(taiKhoan.getId());
        taiKhoanService.save(taiKhoan);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/dangKySocialAccount")
    public LoginResponse registerSocialAccount(@Valid @RequestBody TaiKhoan taiKhoan)
    {
        for (TaiKhoan tk : ListTaiKhoan()) {
            if(tk.getUserName().equals(taiKhoan.getUserName()))
            {
                System.out.println("Có rồi nè");
                TaiKhoan taiKhoan2 = taiKhoanService.findTaiKhoanByUserName(tk.getUserName());
                taiKhoan2.setPassword(taiKhoan.getPassword());
                TaiKhoan taiKhoan1 = taiKhoanService.save(taiKhoan2);

                LoginResponse loginResponse = new LoginResponse();
                loginResponse.setUserName(taiKhoan1.getUserName());
                String jwt = tokenProvider.generateToken(taiKhoan1.getId());
                loginResponse.setAccessToken(jwt);
                loginResponse.setNewAccount(false);
                loginResponse.setId(taiKhoan1.getId());
                loginResponse.setCustomerName(khachHangService.findKHByIDTaiKhoan(taiKhoan1).getTen());
                loginResponse.setSocialAccount(true);

                return loginResponse;
            }
        }
        System.out.println("Chưa có");
        System.out.println(taiKhoan.toString());
        String encodedPassword = new BCryptPasswordEncoder().encode(taiKhoan.getPassword());
        taiKhoan.setPassword(encodedPassword);
        TaiKhoan tk = taiKhoanService.save(taiKhoan);

        //Login response
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setUserName(tk.getUserName());
        String jwt = tokenProvider.generateToken(tk.getId());
        loginResponse.setAccessToken(jwt);
        loginResponse.setNewAccount(true);
        loginResponse.setId(tk.getId());
        loginResponse.setSocialAccount(true);
//        loginResponse.setCustomerName(khachHangService.findKHByIDTaiKhoan(tk).getTen());

        return loginResponse;
    }

    @RequestMapping(value = "/getIDKHByIDTK/{id}")
    int getIDKHByIDTK(@PathVariable("id") int id)
    {
        TaiKhoan taiKhoan = taiKhoanService.findById(id);
        return khachHangService.findKHByIDTaiKhoan(taiKhoan).getId();
    }

    @RequestMapping(value = "/loginInfo")
    public Authentication loginInFo()
    {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return  auth;
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
        sanPham.setStatus(true);
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

    @GetMapping(value = "/checkCartQuantityBeforeCheckOut")
    public List<SanPham> checkCartQuantityBeforeCheckOut(HttpServletRequest request)
    {

        List<SanPham> removedSanPhamFromCart = new ArrayList<SanPham>();;
        Cart cart = CartUtils.getCart(request);

        if(cart!=null)
        {
            for (CartLine cartLine : cart.getCartLines()) {
                SanPham sanPham = sanPhamService.findById(cartLine.getSanPham().getId());
                if(cartLine.getSoLuong()>sanPham.getSoLuong())
                {
                    removedSanPhamFromCart.add(cartLine.getSanPham());
                }
            }
            for(SanPham sanPham: removedSanPhamFromCart)
            {
                cart.removeProduct(sanPham);
            }
        }
        return removedSanPhamFromCart;
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
        hoaDon.setTinhTrang("Đang xử lý");
        HoaDon hd = hoaDonService.save(hoaDon);

        System.out.println(hd.getEmail());

        Cart cart = CartUtils.getCart(request);

        for ( CartLine line: cart.getCartLines()) {

            SanPham sanPham = sanPhamService.findById(line.getSanPham().getId());

            ChiTietHoaDon chiTietHoaDon = new ChiTietHoaDon();

            chiTietHoaDon.setHoaDon(hd);
            chiTietHoaDon.setSanPham(sanPham);
            chiTietHoaDon.setDonGia((int) line.getTongTien());
            chiTietHoaDon.setSoLuong(line.getSoLuong());

            SanPham sp = sanPhamService.findById(line.getSanPham().getId());
            sp.setSoLuong(sp.getSoLuong()-line.getSoLuong());

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

    @PostMapping("/themKhachHang")
    public KhachHang addNewCus(@Valid @RequestBody KhachHang khachHang) {
        return khachHangService.save(khachHang);
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

    @Autowired
    public JavaMailSender emailSender;

    @PostMapping("/sendEmail")
    public String sendEmail(@Valid @RequestBody Mail mail) {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = null;
        Locale localeVN = new Locale("vi", "VN");
        NumberFormat nf = NumberFormat.getInstance(localeVN);
        String item = "";

        HoaDon hoaDon = hoaDonService.getHoaDonByID(Integer.parseInt(mail.getHoaDon()));
        List<ChiTietHoaDon> chiTietHoaDons = chiTietHoaDonService.getChiTietHoaDonsByHoaDon(hoaDon);
        for (ChiTietHoaDon chiTietHoaDon : chiTietHoaDons) {
            item = item + "<!-- Item --> <tr style=\"border-collapse:collapse;\"> <td align=\"left\" style=\"Margin:0;padding-top:5px;padding-bottom:10px;padding-left:20px;padding-right:20px;\"> <!--[if mso]><table width=\"560\" cellpadding=\"0\" cellspacing=\"0\"><tr><td width=\"178\" valign=\"top\"><![endif]--> <table class=\"es-left\" cellspacing=\"0\" cellpadding=\"0\" align=\"left\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td class=\"es-m-p0r es-m-p20b\" width=\"178\" valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td align=\"center\" style=\"padding:0;Margin:0;\"> <img src=\""+chiTietHoaDon.getSanPham().getHinh()+"\" alt=\""+chiTietHoaDon.getSanPham().getTenSP()+"\" class=\"adapt-img\" title=\""+chiTietHoaDon.getSanPham().getTenSP()+"\" width=\"125\" style=\"display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;\"> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!--[if mso]></td><td width=\"20\"></td><td width=\"362\" valign=\"top\"><![endif]--> <table cellspacing=\"0\" cellpadding=\"0\" align=\"right\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td width=\"362\" align=\"left\" style=\"padding:0;Margin:0;\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td align=\"left\" style=\"padding:0;Margin:0;\"> <p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue' , helvetica, sans-serif;line-height:21px;color:#333333;\"> <br></p> <table style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;\" class=\"cke_show_border\" cellspacing=\"1\" cellpadding=\"1\" border=\"0\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td style=\"padding:0;Margin:0;\"> "+chiTietHoaDon.getSanPham().getTenSP()+"</td> <td style=\"padding:0;Margin:0;text-align:center;\" width=\"60\">"+chiTietHoaDon.getSoLuong()+" </td> <td style=\"padding:0;Margin:0;text-align:center;\" width=\"100\"> "+nf.format(chiTietHoaDon.getDonGia())+" VND</td> </tr> </tbody> </table> <p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue' , helvetica, sans-serif;line-height:21px;color:#333333;\"> <br></p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!--[if mso]></td></tr></table><![endif]--> </td> </tr> <!-- Line --> <tr style=\"border-collapse:collapse;\"> <td align=\"left\" style=\"padding:0;Margin:0;padding-left:20px;padding-right:20px;\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td width=\"560\" valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td align=\"center\" style=\"padding:0;Margin:0;padding-bottom:10px;\"> <table width=\"100%\" height=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td style=\"padding:0;Margin:0px;border-bottom:1px solid #EFEFEF;background:rgba(0, 0, 0, 0) none repeat scroll 0% 0%;height:1px;width:100%;margin:0px;\"> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr>";
        }
        System.out.println(item);
            String footer = " <!-- Price --> <tr style=\"border-collapse:collapse;\"> <td align=\"left\" style=\"Margin:0;padding-top:5px;padding-left:20px;padding-bottom:30px;padding-right:40px;\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td width=\"540\" valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td align=\"right\" style=\"padding:0;Margin:0;\"> <table style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:500px;\" class=\"cke_show_border\" cellspacing=\"1\" cellpadding=\"1\" border=\"0\" align=\"right\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td style=\"padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px;\"> Subtotal:</td> <td style=\"padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px;\">"+nf.format(hoaDon.getTongTien())+" VND</td> </tr> <tr style=\"border-collapse:collapse;\"> <td style=\"padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px;\"> Flat-rate Shipping: </td> <td style=\"padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px;color:#D48344;\"> <strong>FREE</strong> </td> </tr> <tr style=\"border-collapse:collapse;\"> <td style=\"padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px;\"> Discount:</td> <td style=\"padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px;\"> 0</td> </tr> <tr style=\"border-collapse:collapse;\"> <td style=\"padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px;\"> <strong>Order Total:</strong> </td> <td style=\"padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px;color:#D48344;\"> <strong>"+nf.format(hoaDon.getTongTien())+" VND</strong> </td> </tr> </tbody> </table> <p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue' , helvetica, sans-serif;line-height:21px;color:#333333;\"> <br></p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> </body>\n" +
                "\n" +
                "</html>";

        String content = "<!DOCTYPE html> <html lang=\"en\">\n" +
                "\n" +
                "<head> <meta charset=\"UTF-8\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\"> <title>Document</title> </head>\n" +
                "\n" +
                "<body>\n" +
                "\n" +
                "</body>\n" +
                "\n" +
                "</html> <!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"> <html style=\"width:100%;font-family:'Times New Roman';-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;\">\n" +
                "\n" +
                "<head> <meta charset=\"UTF-8\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\"> <title>Trigger newsletter</title> <!--[if (mso 16)]> <style type=\"text/css\"> a {text-decoration: none;} </style> <![endif]--> <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> <link rel=\"shortcut icon\" type=\"image/png\" href=\"https://stripo.email/assets/img/favicon.png\"> <style type=\"text/css\"> @media only screen and (max-width:600px) {\n" +
                "\n" +
                " p, ul li, ol li, a { font-size: 16px !important; line-height: 150% !important }\n" +
                "\n" +
                " h1 { font-size: 30px !important; text-align: center; line-height: 120% !important }\n" +
                "\n" +
                " h2 { font-size: 26px !important; text-align: center; line-height: 120% !important }\n" +
                "\n" +
                " h3 { font-size: 20px !important; text-align: center; line-height: 120% !important }\n" +
                "\n" +
                " h1 a { font-size: 30px !important }\n" +
                "\n" +
                " h2 a { font-size: 26px !important }\n" +
                "\n" +
                " h3 a { font-size: 20px !important }\n" +
                "\n" +
                " .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size: 16px !important }\n" +
                "\n" +
                " .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size: 16px !important }\n" +
                "\n" +
                " .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size: 12px !important }\n" +
                "\n" +
                " *[class=\"gmail-fix\"] { display: none !important }\n" +
                "\n" +
                " .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align: center !important }\n" +
                "\n" +
                " .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align: right !important }\n" +
                "\n" +
                " .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align: left !important }\n" +
                "\n" +
                " .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display: inline !important }\n" +
                "\n" +
                " .es-button-border { display: block !important }\n" +
                "\n" +
                " a.es-button { font-size: 20px !important; display: block !important; border-left-width: 0px !important; border-right-width: 0px !important }\n" +
                "\n" +
                " .es-btn-fw { border-width: 10px 0px !important; text-align: center !important }\n" +
                "\n" +
                " .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width: 100% !important }\n" +
                "\n" +
                " .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width: 100% !important; max-width: 600px !important }\n" +
                "\n" +
                " .es-adapt-td { display: block !important; width: 100% !important }\n" +
                "\n" +
                " .adapt-img { width: 100% !important; height: auto !important }\n" +
                "\n" +
                " .es-m-p0 { padding: 0px !important }\n" +
                "\n" +
                " .es-m-p0r { padding-right: 0px !important }\n" +
                "\n" +
                " .es-m-p0l { padding-left: 0px !important }\n" +
                "\n" +
                " .es-m-p0t { padding-top: 0px !important }\n" +
                "\n" +
                " .es-m-p0b { padding-bottom: 0 !important }\n" +
                "\n" +
                " .es-m-p20b { padding-bottom: 20px !important }\n" +
                "\n" +
                " .es-mobile-hidden, .es-hidden { display: none !important }\n" +
                "\n" +
                " .es-desk-hidden { display: table-row !important; width: auto !important; overflow: visible !important; float: none !important; max-height: inherit !important; line-height: inherit !important }\n" +
                "\n" +
                " .es-desk-menu-hidden { display: table-cell !important }\n" +
                "\n" +
                " table.es-table-not-adapt, .esd-block-html table { width: auto !important }\n" +
                "\n" +
                " table.es-social { display: inline-block !important }\n" +
                "\n" +
                " table.es-social td { display: inline-block !important }\n" +
                "\n" +
                " .es-menu td a { font-size: 16px !important } }\n" +
                "\n" +
                " #outlook a { padding: 0; }\n" +
                "\n" +
                " .ExternalClass { width: 100%; }\n" +
                "\n" +
                " .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }\n" +
                "\n" +
                " .es-button { mso-style-priority: 100 !important; text-decoration: none !important; }\n" +
                "\n" +
                " a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }\n" +
                "\n" +
                " .es-desk-hidden { display: none; float: left; overflow: hidden; width: 0; max-height: 0; line-height: 0; mso-hide: all; } </style> <meta property=\"og:title\" content=\"Trigger newsletter\" /> <meta property=\"og:url\" content=\"https://viewstripo.email/template/c4e515dd-89b7-41c2-9ee6-269e3763dabc\" /> <meta property=\"og:type\" content=\"article\" /> </head>\n" +
                "\n" +
                "<body style=\"width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;\"> <div class=\"es-wrapper-color\" style=\"background-color:#EFEFEF; font-family: sans-serif;\"> <!--[if gte mso 9]> <v:background xmlns:v=\"urn:schemas-microsoft-com:vml\" fill=\"t\"> <v:fill type=\"tile\" color=\"#efefef\"></v:fill> </v:background> <![endif]--> <table class=\"es-wrapper\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td valign=\"top\" style=\"padding:0;Margin:0;\"> <table class=\"es-header\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td align=\"center\" style=\"padding:0;Margin:0;\"> <table class=\"es-header-body\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#ffffff\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#27bece;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td align=\"left\" style=\"Margin:0;padding-top:5px;padding-bottom:5px;padding-left:15px;padding-right:15px;\"> <!--[if mso]><table width=\"570\" cellpadding=\"0\" cellspacing=\"0\"><tr><td width=\"180\" valign=\"top\"><![endif]--> <table class=\"es-left\" cellspacing=\"0\" cellpadding=\"0\" align=\"left\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td class=\"es-m-p0r\" width=\"180\" valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td class=\"es-m-p0l es-m-txt-c\" align=\"left\" style=\"padding:0;Margin:0;padding-left:15px;\"> <a href=\"http://localhost:3000/\" target=\"_blank\" style=\"-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#999999;\"><img src=\"https://pokebizute15.000webhostapp.com/images/logo.png\" alt=\"DHPro logo\" title=\"DHPro logo\" width=\"118\" style=\"display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;\"></a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td align=\"center\" style=\"padding:0;Margin:0;\"> <table class=\"es-content-body\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#ffffff\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td align=\"left\" style=\"Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td width=\"560\" valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;\"> <table style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:0px;\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td align=\"center\" style=\"padding:0;Margin:0;padding-top:10px;padding-bottom:15px;\"> <h1 style=\"Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:'trebuchet ms', helvetica, sans-serif;font-size:30px;font-style:normal;font-weight:normal;color:#333333;\"> Thank you for your order<br> </h1> </td> </tr> <tr style=\"border-collapse:collapse;\"> <td align=\"center\" style=\"Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px;\"> <p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;\"> You'll recevice an email when your Items are shipped. If you have any questions, Call us 0987-654-321. <br> </p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td align=\"center\" style=\"padding:0;Margin:0;\"> <table class=\"es-content-body\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#ffffff\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td align=\"left\" style=\"Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;padding-bottom:30px;\"> <!--[if mso]><table width=\"560\" cellpadding=\"0\" cellspacing=\"0\"><tr><td width=\"280\" valign=\"top\"><![endif]--> <table class=\"es-left\" cellspacing=\"0\" cellpadding=\"0\" align=\"left\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td class=\"es-m-p20b\" width=\"280\" align=\"left\" style=\"padding:0;Margin:0;\"> <table style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#FEF9EF;border-color:#EFEFEF;border-width:1px 0px 1px 1px;border-style:solid;\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#fef9ef\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td align=\"left\" style=\"Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px;\"> <h4 style=\"Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'trebuchet ms', helvetica, sans-serif;\"> SUMMARY:</h4> </td> </tr> <tr style=\"border-collapse:collapse;\"> <td align=\"left\" style=\"padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px;\"> <table style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;\" class=\"cke_show_border\" cellspacing=\"1\" cellpadding=\"1\" border=\"0\" align=\"left\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td style=\"padding:0;Margin:0;\"> <span style=\"font-size:14px;line-height:21px;\">Order #:</span> </td> <td style=\"padding:0;Margin:0;\"> <span style=\"font-size:14px;line-height:21px;\">"+hoaDon.getId()+"</span> </td> </tr> <tr style=\"border-collapse:collapse;\"> <td style=\"padding:0;Margin:0;\"> <span style=\"font-size:14px;line-height:21px;\">Order Date</span> </td> <td style=\"padding:0;Margin:0;\"> <span style=\"font-size:14px;line-height:21px;\">"+hoaDon.getNgayMuaHang()+"</span> </td> </tr> <tr style=\"border-collapse:collapse;\"> <td style=\"padding:0;Margin:0;\"> <span style=\"font-size:14px;line-height:21px;\">Order Total:</span> </td> <td style=\"padding:0;Margin:0;\"> <span style=\"font-size:14px;line-height:21px;\">"+nf.format(hoaDon.getTongTien())+" VND</span> </td> </tr> </tbody> </table> <p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;\"> <br></p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!--[if mso]></td><td width=\"0\"></td><td width=\"280\" valign=\"top\"><![endif]--> <table class=\"es-right\" cellspacing=\"0\" cellpadding=\"0\" align=\"right\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td width=\"280\" align=\"left\" style=\"padding:0;Margin:0;\"> <table style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#FEF9EF;border-width:1px;border-style:solid;border-color:#EFEFEF;\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#fef9ef\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td align=\"left\" style=\"Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px;\"> <h4 style=\"Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'trebuchet ms', helvetica, sans-serif;\"> SHIPPING ADDRESS:<br></h4> </td> </tr> <tr style=\"border-collapse:collapse;\"> <td align=\"left\" style=\"padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px;\"> <p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;\"> "+VNCharacterUtils.removeAccent(hoaDon.getTenKH())+"</p> <p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;\"> "+ VNCharacterUtils.removeAccent(hoaDon.getDiaChi()) +"</p> <p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;\"></p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td align=\"center\" style=\"padding:0;Margin:0;\"> <table class=\"es-content-body\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#ffffff\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;\"> <tbody> <!-- Header --> <tr style=\"border-collapse:collapse;\"> <td align=\"left\" style=\"Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;\"> <!--[if mso]><table width=\"560\" cellpadding=\"0\" cellspacing=\"0\"><tr><td width=\"270\" valign=\"top\"><![endif]--> <table class=\"es-left\" cellspacing=\"0\" cellpadding=\"0\" align=\"left\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td class=\"es-m-p0r es-m-p20b\" width=\"270\" valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td align=\"left\" style=\"padding:0;Margin:0;padding-left:20px;\"> <h4 style=\"Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'trebuchet ms', helvetica, sans-serif;\"> ITEMS ORDERED </h4> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!--[if mso]></td><td width=\"20\"></td><td width=\"270\" valign=\"top\"><![endif]--> <table cellspacing=\"0\" cellpadding=\"0\" align=\"right\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td width=\"270\" align=\"left\" style=\"padding:0;Margin:0;\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td align=\"left\" style=\"padding:0;Margin:0;\"> <table style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;\" class=\"cke_show_border\" cellspacing=\"1\" cellpadding=\"1\" border=\"0\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td style=\"padding:0;Margin:0;\"> <span style=\"font-size:13px;\">NAME</span> </td> <td style=\"padding:0;Margin:0;text-align:center;\" width=\"60\"> <span style=\"font-size:13px;\"><span style=\"line-height:100%;\">QTY</span></span> </td> <td style=\"padding:0;Margin:0;text-align:center;\" width=\"100\"> <span style=\"font-size:13px;\"><span style=\"line-height:100%;\">PRICE</span></span> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!--[if mso]></td></tr></table><![endif]--> </td> </tr> <!-- Line --> <tr style=\"border-collapse:collapse;\"> <td align=\"left\" style=\"padding:0;Margin:0;padding-left:20px;padding-right:20px;\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td width=\"560\" valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td align=\"center\" style=\"padding:0;Margin:0;padding-bottom:10px;\"> <table width=\"100%\" height=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;\"> <tbody> <tr style=\"border-collapse:collapse;\"> <td style=\"padding:0;Margin:0px;border-bottom:1px solid #EFEFEF;background:rgba(0, 0, 0, 0) none repeat scroll 0% 0%;height:1px;width:100%;margin:0px;\"> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr>";
        try {
            message.setHeader("Content-Type", "text/html; charset=UTF-8");
            helper = new MimeMessageHelper(message, true);
            helper.setSubject("DHPro - Your order has been received");
            helper.setTo(hoaDon.getEmail());
            helper.setText(content+item+footer, true);
            emailSender.send(message);
            return "OK";
        } catch (MessagingException e) {
            e.printStackTrace();
            return  e.toString();
        }
    }
}
