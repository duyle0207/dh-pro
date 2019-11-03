package com.project.dhpro.models;

import java.util.List;

public class CardtInfo {

    private CustomerInfo customerInfo;

    private List<CardLine> cardLines;

    public CustomerInfo getCustomerInfo() {
        return customerInfo;
    }

    public void setCustomerInfo(CustomerInfo customerInfo) {
        this.customerInfo = customerInfo;
    }

    public List<CardLine> getCardLines() {
        return cardLines;
    }

    public void setCardLines(List<CardLine> cardLines) {
        this.cardLines = cardLines;
    }
}
