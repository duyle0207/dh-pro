import React, { Component } from 'react';
import '../../../css/style.css';
import InfoCartCustomer from './infoCartCustomer';

class cartInfo extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            visibleInfoCus: false,
            cartQuantity: 0,
            amount: 0
        });

        this.handleInfoCus = this.handleInfoCus.bind(this);
    }

    async componentDidMount() {
        const cartQuantity = await (await fetch(`/customerUnauthenticated/getAllQuantity`)).json();
        const amount = await (await fetch(`/customerUnauthenticated/getAmount`)).json();
        this.setState({
            cartQuantity: cartQuantity,
            amount: amount
        })
    }

    handleInfoCus() {
        this.setState({ visibleInfoCus: !this.state.visibleInfoCus })
    }
    render() {

        return (
            <div className="container">
                <div className="col-sm-12">

                    <div className="cart-info">
                        <h5>Thông tin khách hàng</h5>
                        <InfoCartCustomer></InfoCartCustomer>
                        <div className="row">
                            <div className="col-sm-8"></div>
                            <div className="col-sm-2">
                                <p className="info-cart">Tổng sản phẩm:</p>
                            </div>
                            <div className="col-sm-2">
                                <p className="total-cart">
                                    {this.state.cartQuantity}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-8"></div>
                            <div className="col-sm-2">
                                <p className="info-cart">Thành tiền</p>
                            </div>
                            <div className="col-sm-2">
                                <p className="total-cart">
                                    {(this.state.amount).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4"></div>
                            <div className="col-sm-5"></div>
                            <div className="col-sm-3">
                                <button type="button" className="btn btn-danger" onClick={this.handleInfoCus}
                                    style={{ width: '100%' }}>
                                    Thanh toán
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default cartInfo;