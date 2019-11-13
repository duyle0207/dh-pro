import React, { Component } from 'react';
import '../../../css/style.css';
import Header from '../../../components/customer/dashboard/header';
import Footer from '../../../components/customer/dashboard/footer';
import ItemCart from '../item/itemCart';
import CartInfo from '../cart/cartInfo';

class cart extends Component {

    constructor(props)
    {
        super(props);

        this.state = ({
            cartLines: []
        });
    }
    
    async componentDidMount()
    {
        const cartLines = await (await fetch(`/customerUnauthenticated/shoppingCart`)).json()

        this.setState({cartLines: cartLines.cartLines});

        console.log(this.state.cartLines);
    }

    render() {
        return (
            <div>
                <Header></Header>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            {
                                (this.state.cartLines).map((value)=>{
                                    // console.log(value);
                                    return <ItemCart cartLines={value} product={value.sanPham}></ItemCart>
                                })
                            }
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