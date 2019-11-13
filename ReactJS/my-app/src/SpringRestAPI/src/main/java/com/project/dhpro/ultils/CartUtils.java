package com.project.dhpro.ultils;

import com.project.dhpro.models.Cart;

import javax.servlet.http.HttpServletRequest;

public class CartUtils {

    public static Cart getCart(HttpServletRequest request)
    {
        Cart cart = (Cart) request.getSession().getAttribute("myCart");

        if(cart == null)
        {
            System.out.println("Cart Null");
            cart = new Cart();
            request.getSession().setAttribute("myCart",cart);
        }
        return cart;
    }

    public static void removeCart(HttpServletRequest request)
    {
        request.getSession().removeAttribute("myCart");
    }
}
