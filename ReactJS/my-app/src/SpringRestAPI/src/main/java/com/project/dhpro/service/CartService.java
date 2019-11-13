package com.project.dhpro.service;

import com.project.dhpro.models.Cart;
import com.project.dhpro.models.KhachHang;
import com.project.dhpro.models.SanPham;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.smartcardio.Card;
import javax.transaction.Transactional;

@Transactional
@Service
public class CartService {

    public void createCart(KhachHang khachHang, HttpServletRequest request)
    {
        Cart cart = new Cart();
        cart.setKhangHang(khachHang);
        request.getSession().setAttribute("myCart",cart);
    }

    public void addProductToCart(SanPham sanPham, HttpServletRequest request)
    {

    }
}
