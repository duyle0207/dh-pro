import React, { Component } from 'react';
import '../../../css/style.css';
import InfoCartCustomer from './infoCartCustomer';

class cartInfo extends Component {
    constructor(props)
    {
        super(props);
        this.state = ({
            visibleInfoCus : false 
        });

        this.handleInfoCus = this.handleInfoCus.bind(this);
    }
    handleInfoCus()
    {
        this.setState({visibleInfoCus: !this.state.visibleInfoCus})
    }
    render() {
        if(this.state.visibleInfoCus === true)
        {
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
                                    <p className="total-cart">4</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-8"></div>
                                <div className="col-sm-2">
                                    <p className="info-cart">Thành tiền</p>
                                </div>
                                <div className="col-sm-2">
                                    <p className="total-cart">$25.5</p>
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
            );
        }
        else{
            return (
                <div className="container">
                    <div className="col-sm-12">
                        <div className="cart-info">
                            <div className="row">
                                <div className="col-sm-8"></div>
                                <div className="col-sm-2">
                                    <p className="info-cart">Tổng sản phẩm:</p>
                                </div>
                                <div className="col-sm-2">
                                    <p className="total-cart">4</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-8"></div>
                                <div className="col-sm-2">
                                    <p className="info-cart">Thành tiền</p>
                                </div>
                                <div className="col-sm-2">
                                    <p className="total-cart">$25.5</p>
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
            );
        }
    }
}

export default cartInfo;