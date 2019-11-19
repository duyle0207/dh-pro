import React, { Component } from 'react';
import '../../../css/style.css';
import Header from '../../../components/customer/dashboard/header';
import Footer from '../../../components/customer/dashboard/footer';
import ItemCart from '../item/itemCart';
import CartInfo from '../cart/cartInfo';
import { Link } from "react-router-dom";

class cart extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            cartLines: []
        });
    }

    async componentDidMount() {
        const cartLines = await (await fetch(`/customerUnauthenticated/shoppingCart`)).json()

        this.setState({ cartLines: cartLines.cartLines });

        console.log(this.state.cartLines);
    }

    render() {
        return (
            <div>
                <Header></Header>
                <div className="container my-4">
                    <nav class="navbar navbar-light bg-light">
                        <span class="navbar-brand mb-0 h1">
                            GIỎ HÀNG
                        </span>
                    </nav>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            {this.state.cartLines.length === 0 ?
                                <div className="container text-center">
                                    <img className="" width="550px" height="450px" src="https://cdn.dribbble.com/users/204955/screenshots/4930541/emptycart.png" />
                                    <p className="h5">Không có sản phẩm nào trong giỏ hàng của bạn.</p>
                                    <Link to={'/'} className="btn btn-warning mt-4 shadow-none"><p className="h4 mt-2">QUAY LẠI TRANG CHỦ</p></Link>
                                </div>
                                :
                                (this.state.cartLines).map((value) => {
                                    // console.log(value);
                                    return <ItemCart cartLines={value} product={value.sanPham}></ItemCart>
                                })
                            }
                            {/* {
                                (this.state.cartLines).map((value) => {
                                    // console.log(value);
                                    return <ItemCart cartLines={value} product={value.sanPham}></ItemCart>
                                })
                            } */}
                        </div>
                    </div>
                </div>
                {this.state.cartLines.length===0?'':<CartInfo></CartInfo>}
                <Footer></Footer>
            </div>
        );
    }
}

export default cart;