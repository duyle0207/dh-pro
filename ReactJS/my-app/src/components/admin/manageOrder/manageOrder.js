import React, { Component, Fragment } from 'react';
import Products from '../../customer/accountInfo/products';

export class ManageOrder extends Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            productList: [],
            donGia: '',
            isSending: false,
            sendMailStatus: ''
        }
        this.onConfirmClick = this.onConfirmClick.bind(this);
    }

    async componentDidMount() {
        const token = JSON.parse((localStorage.getItem("adminInfo"))).accessToken;

        const response = await fetch(`/hung/hoaDon`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        });
        const json = await response.json();
        this.setState({ orders: json }, () => console.log(this.state.orders));
    }

    async onViewDetailClick(id) {
        const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
        if (!isTokenValid) {
            this.props.history.push('/loginAdmin?message=tokenexpired');
        }
        else {
            const productList = await (await fetch(`/customerUnauthenticated/getCTHD/${id}`)).json();
            this.setState({ productList: productList }, () => {
                const dg = this.state.productList.reduce((accumulator, currentValue) => {
                    return (accumulator + currentValue.donGia)
                }, 0);
                this.setState({ donGia: dg });
            });
        }
    }

    async onConfirmClick() {
        const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
        if (!isTokenValid) {
            this.props.history.push('/loginAdmin?message=tokenexpired');
        }
        else {
            this.setState({ isSending: true });
            const customer = this.state.productList[0].hoaDon.khachHang;
            const order = this.state.productList[0].hoaDon;
            console.log("Order");
            console.log(this.state.productList[0].hoaDon);
            await fetch(`/customerUnauthenticated/sendEmail`, {
                method: 'POST',
                body: JSON.stringify({
                    mail: customer.email,
                    content: 'Đơn hàng của bạn đã được xác nhận',
                    hoaDon: order.id,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(async res => {
                this.setState({ isSending: false });
                if (res.ok) {
                    const token = JSON.parse((localStorage.getItem("adminInfo"))).accessToken;
                    console.log("Respone OK");
                    this.setState({ sendMailStatus: 'Gửi mail thành công!' });
                    fetch('/confirmOrder', {
                        method: 'PUT',
                        body: this.state.productList[0].hoaDon.id,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': "Bearer " + token
                        }
                    }).then(async res => {
                        if (res.ok) {
                            const token = JSON.parse((localStorage.getItem("adminInfo"))).accessToken;

                            const response = await fetch(`/hung/hoaDon`, {
                                method: 'GET',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': "Bearer " + token
                                }
                            });
                            const json = await response.json();
                            this.setState({ orders: json }, () => console.log(this.state.orders));
                        }
                    }).catch(err => console.log('Error', err));

                } else {
                    console.log("Response fail");
                    this.setState({ sendMailStatus: 'Đã có lỗi xảy ra, không thể gửi mail!' });
                }
            }).catch(err => console.log(err));
        }
    }

    render() {
        return (
            <div className="container-fluid mt-4">
                <div className="row col-12">
                    <h3>Quản lý đơn hàng</h3>
                </div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên khách hàng</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Ngày mua hàng</th>
                            <th scope="col">Tổng tiền</th>
                            <th scope="col">Phương thức thanh toán</th>
                            <th scope="col">Tình trạng</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orders.map((order) => {
                            return (
                                <tr key={order.id}>
                                    <th scope="row">{order.id}</th>
                                    <td>{order.tenKH}</td>
                                    <td>{order.diaChi}</td>
                                    <td>{order.soDT}</td>
                                    <td>{order.ngayMuaHang}</td>
                                    <td>{order.tongTien}</td>
                                    <td>{order.phuongThucThanhToan.tenPhuongThucThanhToan}</td>
                                    <td>{order.tinhTrang}</td>
                                    <td>
                                        <button className="btn btn-success" data-toggle="modal" data-target="#confirmForm"
                                            onClick={() => this.onViewDetailClick(order.id)}>Xem chi tiết
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="modal fade" id="confirmForm" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Chi tiết đơn hàng</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ pointerEvents: 'none' }}>
                                <table className="table table-borderless table-hover">
                                    <thead className="thead-secondary bg-warning">
                                        <tr>
                                            <th scope="col"><b>Sản phẩm</b></th>
                                            <th scope="col"></th>
                                            <th scope="col">Giá</th>
                                            <th scope="col">Số lượng</th>
                                            <th scope="col">Tạm tính</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.productList.map((value, index) => {
                                            return <Products product={value} key={index}></Products>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Đóng</button>
                                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#sendMail"
                                    data-dismiss="modal" onClick={this.onConfirmClick}>
                                    Xác nhận đơn hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div >

                <div class="modal fade" id="sendMail" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-body py-4">
                                {this.state.isSending ?
                                    <div className="row">
                                        <h2>Đang gửi...</h2>
                                        <div class="spinner-border" role="status">
                                            <span class="sr-only">Loadings...</span>
                                        </div>
                                    </div> :
                                    <h2 >{this.state.sendMailStatus}</h2>

                                }
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" data-dismiss="modal" disabled={this.state.isSending}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default ManageOrder;