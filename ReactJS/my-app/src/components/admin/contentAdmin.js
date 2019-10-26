import React, { Component } from 'react';
import Card from './cardDashboard';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const dataNgay = [
    {
        name: ' 1', doanhThu: 4000, donHang: 40
    },
    {
        name: ' 2', doanhThu: 3000, donHang: 30
    },
    {
        name: ' 3', doanhThu: 2000, donHang: 20
    },
    {
        name: ' 4', doanhThu: 2780, donHang: 28
    },
    {
        name: ' 5', doanhThu: 1890, donHang: 19
    },
    {
        name: ' 6', doanhThu: 2390, donHang: 24
    },
    {
        name: ' 7', doanhThu: 3490, donHang: 34
    },
    {
        name: ' 8', doanhThu: 2000, donHang: 20
    },
    {
        name: ' 9', doanhThu: 2780, donHang: 28
    },
    {
        name: ' 10', doanhThu: 1890, donHang: 18
    },
    {
        name: ' 11', doanhThu: 2390, donHang: 23
    },
    {
        name: '12', doanhThu: 3490, donHang: 34
    },
    {
        name: ' 13', doanhThu: 4000, donHang: 40
    },
    {
        name: ' 14', doanhThu: 3000, donHang: 30
    },
    {
        name: ' 15', doanhThu: 2000, donHang: 20
    },
    {
        name: ' 16', doanhThu: 2780, donHang: 28
    },
    {
        name: ' 17', doanhThu: 1890, donHang: 19
    },
    {
        name: ' 18', doanhThu: 2390, donHang: 24
    },
    {
        name: ' 19', doanhThu: 3490, donHang: 32
    },
    {
        name: ' 20', doanhThu: 2000, donHang: 18
    },
    {
        name: ' 21', doanhThu: 2780, donHang: 19
    },
    {
        name: ' 22', doanhThu: 1890, donHang: 18
    },
    {
        name: ' 23', doanhThu: 2390, donHang: 22
    },
    {
        name: '24', doanhThu: 3490, donHang: 30
    },
    {
        name: ' 25', doanhThu: 4000, donHang: 38
    },
    {
        name: ' 26', doanhThu: 3000, donHang: 26
    },
    {
        name: ' 27', doanhThu: 2000, donHang: 12
    },
    {
        name: ' 28', doanhThu: 2780, donHang: 25
    },
    {
        name: ' 29', doanhThu: 1890, donHang: 16
    },
    {
        name: ' 30', doanhThu: 2390, donHang: 21
    },
    {
        name: ' 31', doanhThu: 3490, donHang: 28
    },
];

const dataThang = [
    {
        name: ' 1', doanhThu: 4000, donHang: 40
    },
    {
        name: ' 2', doanhThu: 3000, donHang: 30
    },
    {
        name: ' 3', doanhThu: 2000, donHang: 20
    },
    {
        name: ' 4', doanhThu: 2780, donHang: 28
    },
    {
        name: ' 5', doanhThu: 1890, donHang: 19
    },
    {
        name: ' 6', doanhThu: 2390, donHang: 24
    },
    {
        name: ' 7', doanhThu: 3490, donHang: 34
    },
    {
        name: ' 8', doanhThu: 2000, donHang: 20
    },
    {
        name: ' 9', doanhThu: 2780, donHang: 28
    },
    {
        name: ' 10', doanhThu: 1890, donHang: 18
    },
    {
        name: ' 11', doanhThu: 2390, donHang: 23
    },
    {
        name: '12', doanhThu: 3490, donHang: 34
    },
];

const dataNam = [
    {
        name: '2015', doanhThu: 2000, donHang: 6
    },
    {
        name: '2016', doanhThu: 560, donHang: 1
    },
    {
        name: '2017', doanhThu: 3110, donHang: 9
    },
    {
        name: '2018', doanhThu: 4102, donHang: 13
    },
    {
        name: '2019', doanhThu: 1890, donHang: 4
    },
];

const divChart = {
    border: '1px solid #dddddd',
    background: '#fff',
    width: '97%',
    marginLeft: '15px',
}

class contentAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            chartType: '',
            data: [],

        });
        this.onNgayClick = this.onNgayClick.bind(this);
        this.onThangClick = this.onThangClick.bind(this);
        this.onNamClick = this.onNamClick.bind(this);
    }

    componentDidMount() {
        this.setState({
            chartType: 'ngay',
            data: dataNgay
        });
    }

    onNgayClick() {
        this.setState({
            chartType: 'ngay',
            data: dataNgay
        });
    }

    onThangClick() {
        this.setState({
            chartType: 'thang',
            data: dataThang
        });
    }

    onNamClick() {
        this.setState({
            chartType: 'nam',
            data: dataNam
        });
    }

    render() {
        return (
            <div id="content-wrapper" style={{ background: '#f5f5f5' }}>
                <div className="container-fluid">
                    <div className="row ml-3">
                        <h2>Dashboard</h2>
                    </div>
                    <div className="row mb-4">
                        <Card icon='fa-money-bill-alt' number='150 triệu' desciption='Tổng doanh thu(VND)' color='#00799e'></Card>
                        <Card icon='fa-shopping-cart' number='200' desciption='Lượt đặt hàng' color='#5cb85b'></Card>
                        <Card icon='fa-user' number='300' desciption='Tổng khách hàng' color='#d9534f'></Card>
                    </div>
                    <div className="row my-4">
                        <div className="col-sm-12">
                            <div style={divChart}>
                                <div className="row">
                                    <div className="btn-group my-4 ml-4" role="group" aria-label="Basic example">
                                        {this.state.chartType === 'ngay' ?
                                            <button type="button" className="btn btn-outline-secondary active">Ngày</button> :
                                            <button type="button" className="btn btn-outline-secondary" onClick={this.onNgayClick}>Ngày</button>
                                        }
                                        {this.state.chartType === 'thang' ?
                                            <button type="button" className="btn btn-outline-secondary active">Tháng</button> :
                                            <button type="button" className="btn btn-outline-secondary" onClick={this.onThangClick}>Tháng</button>
                                        }
                                        {this.state.chartType === 'nam' ?
                                            <button type="button" className="btn btn-outline-secondary active">Năm</button> :
                                            <button type="button" className="btn btn-outline-secondary" onClick={this.onNamClick}>Năm</button>
                                        }
                                    </div>
                                </div>
                                <ResponsiveContainer width="100%" height={280}>
                                    <AreaChart data={this.state.data} syncId="anyId"
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Legend formatter={() => (["Doanh Thu"])} />
                                        <Tooltip formatter={(value) => ([`${value} triệu`, "Doanh Thu"])} />
                                        <Area type="monotone" dataKey="doanhThu" stroke="#8884d8" fill="#8884d8" />
                                    </AreaChart>
                                </ResponsiveContainer>
                                <br />
                                <ResponsiveContainer width="100%" height={280}>
                                    <AreaChart data={this.state.data} syncId="anyId"
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Legend formatter={() => (["Đơn Hàng"])} />
                                        <Tooltip formatter={(value) => ([`${value} đơn`, "Đơn Hàng"])} />
                                        <Area type="monotone" dataKey="donHang" stroke="#82ca9d" fill="#82ca9d" />
                                    </AreaChart>
                                </ResponsiveContainer>
                                <br />
                            </div>
                        </div>
                    </div>
                    <div className="row p-4" style={divChart}>
                        <ul className="nav nav-pills col-12 mb-4 ml-3" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">
                                    <i className="fas fa-fire mr-2"></i>
                                    Đơn hàng mới
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">
                                    <i className="fas fa-trophy mr-2"></i>
                                    Sản phẩm bán chạy
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">
                                    <i className="fas fa-thumbs-down mr-2"></i>
                                    Sản phẩm ít người mua
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content col-12" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Mã đơn hàng</th>
                                            <th scope="col">Khách hàng</th>
                                            <th scope="col">Tình trạng</th>
                                            <th scope="col">Ngày đặt hàng</th>
                                            <th scope="col">Tổng tiền</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Alexander Lacazette</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Mark</td>
                                            <td><btn className="btn btn-success">Xem chi tiết</btn></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Mark</td>
                                            <td><btn className="btn btn-success">Xem chi tiết</btn></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Mark</td>
                                            <td><btn className="btn btn-success">Xem chi tiết</btn></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Mã sản phẩm</th>
                                            <th scope="col">Tên sản phẩm</th>
                                            <th scope="col">Tổng cộng</th>
                                            <th scope="col"><btn></btn></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Alexander Lacazette</td>
                                            <td>Otto</td>
                                            <td><btn className="btn btn-success">Xem chi tiết</btn></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td><btn className="btn btn-success">Xem chi tiết</btn></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td><btn className="btn btn-success">Xem chi tiết</btn></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Mã sản phẩm</th>
                                            <th scope="col">Tên sản phẩm</th>
                                            <th scope="col">Tổng cộng</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td><btn className="btn btn-success">Xem chi tiết</btn></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td><btn className="btn btn-success">Xem chi tiết</btn></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td><btn className="btn btn-success">Xem chi tiết</btn></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default contentAdmin;