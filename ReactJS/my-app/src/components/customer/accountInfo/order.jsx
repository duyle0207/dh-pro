import React, { Component } from 'react';
import Product from './product';
import Products from './products';
import Pagination from "../../Pagination";

const pageLimit = 8;

class order extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            hoaDon: [],
            productList: [],
            idhd: '',
            donGia: 0,
            currentHoaDon: [],
        });
        this.handleViewProduct = this.handleViewProduct.bind(this);
    }

    onPageChanged = data => {
        const offset = (data.currentPage - 1) * data.pageLimit;
        const currentHoaDon = this.state.hoaDon.slice(offset, offset + data.pageLimit);
        this.setState({
            currentHoaDon: currentHoaDon,
        });
    }

    async componentDidMount() {
        const hoaDon = await (await fetch(`/customerUnauthenticated/getHoaDonByKhachHang`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.props.customer)
        })).json();

        this.setState({ hoaDon: hoaDon, currentHoaDon: this.state.hoaDon.slice(0, pageLimit) });
        console.log(hoaDon);
    }

    async handleViewProduct(id) {

        console.log(this.state.hoaDon);

        this.setState({ idhd: id }, async () => {
            // alert(this.state.idhd);
            const productList = await (await fetch(`/customerUnauthenticated/getCTHD/${this.state.idhd}`)).json();
            this.setState({ productList: productList }, () => {
                const dg = this.state.productList.reduce((accumulator, currentValue) => {
                    return (accumulator + currentValue.donGia)
                }, 0);
                this.setState({ donGia: dg });
            });
        });
    }

    render() {
        return (
            <div style={{ marginBottom: 350 }} >
                {this.state.idhd !== '' ?
                    <React.Fragment>
                        <nav className="navbar navbar-light bg-light mb-2">
                            <div className="row">
                                <span className="navbar-brand mb-0 h1">
                                    Đơn hàng của tôi
                                </span>
                            </div>
                        </nav>
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
                                {this.state.productList.map((value) => {
                                    return <Products product={value}></Products>
                                })}
                            </tbody>
                        </table>
                        <div className="row ml-2">
                            <div className="col-sm-6 mt-1">
                                <p className="h5 info-cart">Tạm tính</p>
                            </div>
                            <div className="col-sm-6">
                                <p className="h4 total-cart text-danger">
                                    {(this.state.donGia).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                </p>
                            </div>
                        </div>
                    </React.Fragment>
                    :
                    <div>
                        <nav className="navbar navbar-light bg-light mb-2">
                            <span className="navbar-brand mb-0 h1">
                                Đơn hàng của tôi
                            </span>
                        </nav>
                        <table className="table table-borderless table-hover" style={{height:270}}>
                            <thead className="thead-secondary">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Ngày mua</th>
                                    <th scope="col">Tổng tiền</th>
                                    <th scope="col">Tình trạng</th>
                                    <th scope="col">Thanh toán</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.currentHoaDon.map((value) => {
                                    return <Product id={value.id} thanhToan={value.phuongThucThanhToan} ngayMuaHang={value.ngayMuaHang} tinhTrang={value.tinhTrang} tongTien={value.tongTien} handleViewProduct={this.handleViewProduct}></Product>
                                })}
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-center">
                            {
                                (this.state.hoaDon.length > 0) &&
                                <Pagination totalRecords={this.state.hoaDon.length} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                            }
                        </div>
                    </div>
                }

                {/* {
                    this.state.productList.map((value) => {
                        return <Products product={value}></Products>
                    })
                } */}
            </div>
        );
    }
}

export default order;