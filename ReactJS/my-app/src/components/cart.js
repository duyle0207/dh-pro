import React, { Component } from 'react';
import '../css/style.css';
import Header from './header';
import Footer from './footer';
import ItemCart from '../components/itemCart';
import CartInfo from '../components/cartInfo';

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