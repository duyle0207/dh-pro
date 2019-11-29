import React, { Component } from 'react';
import PaypalCheckoutButton from './PaypalCheckoutButton';

class paypalDemo extends Component {
    render() {
    
        const order = {
            customer: '1',
            total: '50.00',
            items: [
                {
                    name: 'hat',
                    description: 'Brown hat.',
                    quantity: '5',
                    price: '3',
                    tax: '0.01',
                    sku: '1',
                    currency: 'USD'
                },
                {
                    name: 'handbag',
                    description: 'Black handbag.',
                    quantity: '1',
                    price: '15',
                    tax: '0.02',
                    sku: 'product34',
                    currency: 'USD'
                }
            ]
        }

        return (
            <PaypalCheckoutButton 
                order={order}
            />
        )
    }
}

export default paypalDemo;