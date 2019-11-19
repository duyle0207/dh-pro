import React, { Component } from 'react';


class product extends Component {
    render() {
        return (
            <React.Fragment>
                <tr>
                    <th scope="row">{this.props.id}</th>
                    <td>{this.props.ngayMuaHang}</td>
                    <td>{(this.props.tongTien).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                    <td className="w-10"><button className="btn" onClick={()=>this.props.handleViewProduct(this.props.id)}>Xem chi tiết</button></td>
                </tr>
            </React.Fragment>
        );
    }
}

export default product;