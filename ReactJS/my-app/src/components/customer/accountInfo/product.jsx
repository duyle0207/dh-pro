import React, { Component } from 'react';


class product extends Component {
    render() {
        return (
            <React.Fragment>
                <tr>
                    <th scope="row">{this.props.id}</th>
                    <td>{this.props.ngayMuaHang}</td>
                    <td>{(this.props.tongTien).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                    <td>{this.props.tinhTrang === "Đã xác nhận" ? <span class="badge badge-success">Đã xác nhận</span> : <span class="badge badge-danger">Chưa xác nhận</span>}</td>
                    <td>{this.props.thanhToan.id===1?<span class="badge badge-danger">Khi nhận hàng</span>:<span class="badge badge-success">Trực tuyến</span>}</td>
                    <td ><button className="btn" onClick={()=>this.props.handleViewProduct(this.props.id)}>Xem chi tiết</button></td>
                </tr>
            </React.Fragment>
        );
    }
}

export default product;