import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';

const PaypalCheckoutButton = ({ order, funcSaveHoaDon }) => {

    const paypalConf = {
        currency: 'USD',
        env: 'sandbox',
        client: {
            sandbox: 'AbKP2tVAmb6-KKd8DQsPpkeUiEW3YjcdnCyib-i5RVMtDfxNemnsyq9s6hkhOosRAV6jvBxRaeZ89W8O',
            production: '-- id--',
        },
        style: {
            label: 'checkout',
            size: 'responsive',
            shape: 'pill',
            color: 'gold',
            layout: 'horizontal',
        }
    };

    const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

    const payment = (data, actions) => {
        const payment = {
            "intent": "sale",
            "redirect_urls": {
                "return_url": "https://www.paypal.com",
                "cancel_url": "https://www.paypal.com"
            },
            "payer": {
                "payment_method": "paypal"
            },
            transactions: [
                {      
                    "amount": {
                      "total": order.total,
                      "currency": "USD",
                    //   "details": {
                    //     "subtotal": "30.00",
                    //     "tax": "0.07",
                    //     "shipping": "0.03",
                    //     "handling_fee": "1.00",
                    //     "insurance": "0.01",
                    //     "shipping_discount": "-1.00"
                    //   }
                    },
                    "description": "The payment transaction description.",
                    "custom": "EBAY_EMS_90048630024435",
                    // "invoice_number": "48787589673",
                    // "item_list": {
                    //   "items": [
                    //     {
                    //         "name": "hat",
                    //         "sku": "1",
                    //         "price": "3.00",
                    //         "currency": "USD",
                    //         "quantity": "5",
                    //         "description": "Brown hat.",
                    //         "tax": "0.01"
                    //       },
                    //       {
                    //         "name": "handbag",
                    //         "sku": "product34",
                    //         "price": "15.00",
                    //         "currency": "USD",
                    //         "quantity": "1",
                    //         "description": "Black handbag.",
                    //         "tax": "0.02"
                    //       }
                    //   ],
                    //   "shipping_address": {
                    //     "recipient_name": "Brian Robinson",
                    //     "line1": "4th Floor",
                    //     "line2": "Unit #34",
                    //     "city": "San Jose",
                    //     "state": "CA",
                    //     "phone": "011862212345678",
                    //     "postal_code": "95131",
                    //     "country_code": "US"
                    //   }
                    // }
                  }
               ],
            note_to_payer: 'Contact us for any questions on your order.'
        };
        // console
        return actions.payment.create({ payment });
    };

    const onAuthorize = (data, actions) => {
        return actions.payment.execute()
            .then(response => {
                // alert(`onAuthorize: ${response.id}`);
                alert("a");
                // funcSaveHoaDon();
            })
            .catch(error => {
                console.log(error);
                alert("Error")
            });
    };

    const onError = (error) => {
        console.log(error);
    };

    const onCancel = (data, actions) => {
        alert("Cancel");
    };

    return (
        <PayPalButton
            env={paypalConf.env}
            client={paypalConf.client}
            payment={(data, actions) => payment(data, actions)}
            onAuthorize={(data, actions) => onAuthorize(data, actions)}
            onCancel={(data, actions) => onCancel(data, actions)}
            onError={(error) => onError(error)}
            style={paypalConf.style}
            commit
            locale="en_US"
        />
    );
};

export default PaypalCheckoutButton;