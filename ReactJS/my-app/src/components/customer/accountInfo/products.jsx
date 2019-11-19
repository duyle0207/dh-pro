import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class products extends Component {
    render() {
        return (
            <React.Fragment>
                <tr>
                    <td>{this.props.product.sanPham.hinh ? <img src={require(`../../../SpringRestAPI/src/main/webapp/images/${this.props.product.sanPham.hinh}`)} width="100px" height="100px;" alt='' /> : ""}</td>
                    <td><Link className="text-decoration-non text-dark" to={`/itemDetail/${this.props.product.sanPham.id}`}>{this.props.product.sanPham.tenSP}</Link></td>
                    <td><h3 className="lap-price">{this.props.product.sanPham.gia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h3></td>
                    <td><p className="h6">{this.props.product.soLuong}</p></td>
                    <td><h3 className="lap-price">{this.props.product.donGia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h3></td>
                </tr>
            </React.Fragment>
        );
    }
}

export default products;