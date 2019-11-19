package com.project.dhpro.models;

import java.util.ArrayList;
import java.util.List;

public class Cart {

    private KhachHang khangHang;

    private List<CartLine> cartLines = new ArrayList<CartLine>();

    private double total;

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public KhachHang getKhangHang() {
        return khangHang;
    }

    public void setKhangHang(KhachHang khangHang) {
        this.khangHang = khangHang;
    }

    public List<CartLine> getCartLines() {
        return cartLines;
    }

    public void setCartLines(List<CartLine> cartLines) {
        this.cartLines = cartLines;
    }

    //Method
    public CartLine findCardLineInCart(int id)
    {
        if(this.cartLines == null)
        {
            return null;
        }
        else
        {
            for ( CartLine line : this.cartLines)
            {
                if(line.getSanPham().getId()==id)
                {
                    return line;
                }
            }
        }
        return null;
    }

    public void saveProductToCart(SanPham sanPham, int soLuong)
    {
        CartLine cartLine = this.findCardLineInCart(sanPham.getId());

        if(cartLine==null)
        {
            cartLine = new CartLine();
            cartLine.setSanPham(sanPham);
            cartLine.setSoLuong(soLuong);
            cartLine.setTongTien((sanPham.getGia())*soLuong);

            this.cartLines.add(cartLine);
        }
        else
        {
            cartLine.setTongTien(soLuong*sanPham.getGia());
            cartLine.setSoLuong(soLuong);
        }
    }

    public void updateCart(SanPham sanPham, int soLuong)
    {
        CartLine cartLine = this.findCardLineInCart(sanPham.getId());

        if(cartLine==null)
        {
            cartLine = new CartLine();
            cartLine.setSanPham(sanPham);
            cartLine.setSoLuong(soLuong);
            cartLine.setTongTien((sanPham.getGia())*soLuong);

            this.cartLines.add(cartLine);
        }
        else
        {
            cartLine.setTongTien(soLuong*sanPham.getGia());
            cartLine.setSoLuong(soLuong+cartLine.getSoLuong());
        }
    }

    public void removeProduct(SanPham sanPham)
    {
        CartLine cartLine = this.findCardLineInCart(sanPham.getId());

        if(cartLine != null)
        {
            this.setTotal(this.setTotalCart());
            this.cartLines.remove(cartLine);
        }
    }

    public double setTotalCart()
    {
        double totalCart = 0;
        for (CartLine line: this.cartLines)
        {
            totalCart += line.getTongTien();
        }
        return totalCart;
    }

    public int getAllQuantity()
    {
        int totalQuantity = 0;
        for(CartLine line: this.cartLines)
        {
            totalQuantity += line.getSoLuong();
        }

        return totalQuantity;
    }
}
