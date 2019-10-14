import React, { Component } from 'react';

class product extends Component {
    render() {
        return (
            <tr>
                <th scope="row">{this.props.idProduct}</th>
                <td>
                    <img src={this.props.imageSrc} width="100" height="50"
                        alt='asda' className="img-fluid">
                    </img>
                </td>
                <td><b>{this.props.lapBrand}</b></td>
                <td>{this.props.lapName}</td>
                <td>{this.props.quantity}</td>
                <td><a href={`/productDetail/${this.props.idProduct}`} className="btn btn-dark">Xem chi tiết</a></td>
            </tr>
        );
    }
}

export default product;