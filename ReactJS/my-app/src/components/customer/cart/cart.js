import React, { Component } from 'react';
import '../../../css/style.css';
import Header from '../../../components/customer/dashboard/header';
import Footer from '../../../components/customer/dashboard/footer';
import ItemCart from '../item/itemCart';
import CartInfo from '../cart/cartInfo';

class cart extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <ItemCart></ItemCart>
                            <ItemCart></ItemCart>
                            <ItemCart></ItemCart>
                        </div>
                    </div>
                </div>
                <CartInfo></CartInfo>
                <Footer></Footer>
            </div>
        );
    }
}

export default cart;