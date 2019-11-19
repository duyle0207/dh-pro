import React, { Component } from 'react';
import '../../../css/style.css';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class itemCart extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            quantity: this.props.cartLines.soLuong,
            cardLines: {},
            product: {},
            choosableQuantity: ''
        })
        this.PlusQuantity = this.PlusQuantity.bind(this);
        this.SubQuantity = this.SubQuantity.bind(this);
        this.CheckQuantity = this.CheckQuantity.bind(this);
    }

    async componentDidMount() {

        const choosableQuantity = await (await fetch(`/customerUnauthenticated/getProductQuantity/${this.props.product.id}`)).json();

        this.setState({
            cartLines: this.props.cartLines,
            product: this.props.product,
            quantity: this.props.cartLines.soLuong,
            choosableQuantity: choosableQuantity
        });
    }

    async PlusQuantity() {
        var a = this.refs.quantity.value;
        if (parseInt(a) < this.state.choosableQuantity) {
            this.setState({
                quantity: this.state.quantity + 1
            }, (async () => {
                await fetch(`/customerUnauthenticated/addToCart/quantity=${this.state.quantity}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state.product)
                }).then((res) => {
                    window.location.reload();
                });
            }));
        }
        else{
            alert(`Số sản phẩm trong kho chỉ còn ${this.state.choosableQuantity}`);
        }
    }
    async SubQuantity() {
        var a = this.refs.quantity.value;
        if (parseInt(a) > 1) {
            this.setState({
                quantity: this.state.quantity - 1
            }, (async () => {
                await fetch(`/customerUnauthenticated/addToCart/quantity=${this.state.quantity}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state.product)
                }).then((res) => {
                    window.location.reload();
                });
            }));
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

    async removeItem(id) {
        await fetch(`/customerUnauthenticated/removeProduct/id=${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            window.location.reload();
        });
    }

    render() {
        return (
            <div className="my-4">
                <div className="row">
                    <div className="col-sm-2">
                        {this.state.product.hinh ? <img src={require(`../../../SpringRestAPI/src/main/webapp/images/${this.state.product.hinh}`)} width="100px" height="100px;" alt='' /> : ""}
                    </div>
                    <div className="col-sm-5">
                        <ul className="list-group" style={{ listStyleType: 'none' }}>
                            <li>
                                <div className="lap-name">
                                    <Link to={`/itemDetail/${this.state.product.id}`} className="text-decoration-none shadow-none">{this.state.product.tenSP}</Link>
                                </div>
                            </li>
                            <li> 
                                <a className="btn btn-link" id="delete-btn" href='#' onClick={()=>this.removeItem(this.state.product.id)} >Xóa</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-3">
                        <h3 className="lap-price">{this.props.product.gia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h3>
                    </div>
                    <div className="col-sm-2">
                        <div className="btn-group btn-group-sm" role="group" aria-label="..." style={{ float: 'right' }}>
                            <button className="btn btn-light shadow-none" type="button" style={{ color: 'black', float: 'right', width: '40px' }} onClick={this.SubQuantity} ref="sub">
                                -
                            </button>
                            <input className="form-control" id="quantity" type="text" value={this.state.quantity}
                                onChange={this.CheckQuantity} disabled={true}
                                style={{ height: '40px', width: '50px' }} ref="quantity" />
                            <button className="btn btn-light shadow-none" type="button" style={{ color: 'black', float: 'left', width: '40px'}} onClick={this.PlusQuantity} ref="plus">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(itemCart);