package com.project.dhpro.models;

import java.util.List;

public class CardLine {

    private ProductInfo productInfo;

    private int quantity;

    public ProductInfo getProductInfo() {
        return productInfo;
    }

    public void setProductInfo(ProductInfo productInfo) {
        this.productInfo = productInfo;
    }

    public CardLine()
    {
        this.quantity = 0;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getAmount()
    {
        return this.quantity *this.productInfo.getGia();
    }

}
