import React, { Component } from 'react';
import '../../../css/style.css';

class itemCart extends Component {
    constructor(props)
    {
        super(props)
        this.state = ({
            quantity: 1
        })
        this.PlusQuantity = this.PlusQuantity.bind(this);
        this.SubQuantity = this.SubQuantity.bind(this);
        this.CheckQuantity = this.CheckQuantity.bind(this);
    }
    PlusQuantity() {
        var a = this.refs.quantity.value;
        if (parseInt(a) < 10) {       
            this.setState({
                quantity : this.state.quantity + 1
            });
        }
    }
    SubQuantity() {
        var a = this.refs.quantity.value;
        if (parseInt(a) > 1) {       
            this.setState({
                quantity : this.state.quantity - 1
            });
        }
    }
    CheckQuantity() {
        // var a = this.refs.quantity.value;
        // if(!Number.isInteger(a))
        // {
        //     alert("Vui lòng nhập số");
        //     this.setState({
        //         quantity: this.state.quantity
        //     })
        // }
        // else if (parseInt(a) <= 0 || parseInt(a) > 10) {
        //     alert("Số lượng không hợp lệ.");
        //     this.setState({
        //         quantity: this.state.quantity
        //     })
        // }
    }
    render() {
        return (
            <div className="product">
                <div className="row">
                    <div className="col-sm-2">
                        <img src="https://cdn.vinpro.net/uploads/images/general/2019/09/16/laptop-asus-ux433fn-a6124t-000.jpg" width="100px" height="100px;" alt='' />
                    </div>
                    <div className="col-sm-5">
                        <ul className="list-group" style={{ listStyleType: 'none' }}>
                            <li>
                                <div className="lap-name">
                                    Laptop HP 14-cK0068TU (4ME90PA) (14" HD/i3-7020U/4GB/500GBHDD/HD
                                    620/Win10/1.6 kg)
                                </div>
                            </li>
                            <li>
                                <a className="btn btn-link" id="delete-btn" href='#aaa'>Xóa</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-3">
                        <h3 className="lap-price">$50</h3>
                    </div>
                    <div className="col-sm-2">
                        <div className="btn-group btn-group-sm" role="group" aria-label="..." style={{ float: 'right' }}>
                            <button className="btn btn-light" type="button" style={{ color: 'black', float: 'right', width: '40px' }} onClick={this.SubQuantity}  ref="sub">
                                -
                            </button>
                            <input className="form-control" id="quantity" type="text" value={this.state.quantity}
                            onChange={this.CheckQuantity} disabled = {true}
                            style={{ height: '40px', width: '50px' }} ref="quantity" />
                            <button className="btn btn-light" type="button" style={{ color: 'black', float: 'left', width: '40px' }} onClick={this.PlusQuantity} ref="plus">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default itemCart;