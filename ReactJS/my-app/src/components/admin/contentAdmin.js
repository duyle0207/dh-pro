import React, { Component } from 'react';
import Card from './cardDashboard';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import { withRouter, Redirect } from 'react-router';

const divChart = {
    border: '1px solid #dddddd',
    background: '#fff',
    width: '97%',
    marginLeft: '15px',
}

var date = new Date();
var month = date.getMonth() + 1;
var year = date.getFullYear();

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

class contentAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            chartType: '',
            data: [],
            totalSales: 0,
            totalOrders: 0,
            totalCustomers: 0,
            hot: [],
            not: [],

        });
        this.onNgayClick = this.onNgayClick.bind(this);
        this.onThangClick = this.onThangClick.bind(this);
    }

    async componentDidMount() {
        const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
        if (!isTokenValid) {
            localStorage.removeItem("adminInfo");
            this.props.history.push('/loginAdmin?message=tokenexpired');
        }
        else {
            const token = JSON.parse((localStorage.getItem("adminInfo"))).accessToken;
            try {
                const statistic = await fetch('/getStatistic', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + token
                    }
                });
                const data = await statistic.json();
                console.log(data);
                this.setState({
                    chartType: 'ngay',
                    totalSales: data[0] / 1000000.0,
                    totalOrders: data[1],
                    totalCustomers: data[2],
                });
                const saleDaysInMonth = await fetch('/chartDay', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + token
                    }
                });
                const saleDaysInMonthValue = await saleDaysInMonth.json();
                console.log(saleDaysInMonthValue);
                console.log(daysInMonth(month, year));
                var ngay = [];
                for (let i = 0; i < daysInMonth(month, year); i++) {
                    ngay[i] = { name: (i + 1).toString(), doanhThu: 0, donHang: 0 };
                    saleDaysInMonthValue.forEach(element => {
                        if (element[0] === i + 1)
                            ngay[i] = { name: (i + 1).toString(), doanhThu: element[1] / 1000000.0, donHang: element[2] };
                    });
                }
                console.log('Ngay', ngay);
                this.setState({
                    data: ngay,
                });
                const hot = await fetch('/hotAndNot', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + token
                    }
                });
                const hotValue = await hot.json();
                const notValue = hotValue;
                console.log('Hot', notValue);
                await this.setState({ hot: hotValue.splice(0, 3), not: notValue.splice(0, 3) });
            } catch (e) {
                console.log('Error', e);
            }
        }
    }

    async onNgayClick() {
        const token = JSON.parse((localStorage.getItem("adminInfo"))).accessToken;
        const saleDaysInMonth = await fetch('/chartDay', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        });
        const saleDaysInMonthValue = await saleDaysInMonth.json();
        console.log(saleDaysInMonthValue);
        console.log(daysInMonth(month, year));
        var ngay = [];
        for (let i = 0; i < daysInMonth(month, year); i++) {
            ngay[i] = { name: (i + 1).toString(), doanhThu: 0, donHang: 0 };
            saleDaysInMonthValue.forEach(element => {
                if (element[0] === i + 1)
                    ngay[i] = { name: (i + 1).toString(), doanhThu: element[1] / 1000000.0, donHang: element[2] };
            });
        }
        console.log('Ngay', ngay);
        this.setState({
            chartType: 'ngay',
            data: ngay,
        })
    }

    async onThangClick() {
        const token = JSON.parse((localStorage.getItem("adminInfo"))).accessToken;
        const response = await fetch('/chartMonth', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        });
        const data = await response.json();
        var thang = [];
        for (let i = 0; i < 12; i++) {
            thang[i] = { name: (i + 1).toString(), doanhThu: 0, donHang: 0 };
            data.forEach(element => {
                if (element[0] === i + 1)
                    thang[i] = { name: (i + 1).toString(), doanhThu: element[1] / 1000000.0, donHang: element[2] };
            });
        }
        this.setState({
            chartType: 'thang',
            data: thang,
        })
    }

    render() {
        return (
            <div id="content-wrapper" style={{ background: '#f5f5f5' }}>
                <div className="container-fluid">
                    <div className="row ml-3">
                        <h2>Dashboard</h2>
                    </div>
                    <div className="row mb-4">
                        <Card icon='fa-money-bill-alt' number={`${this.state.totalSales} triệu`} desciption='Doanh thu tháng' color='#00799e'></Card>
                        <Card icon='fa-shopping-cart' number={this.state.totalOrders} desciption='Lượt đặt hàng tháng' color='#5cb85b'></Card>
                        <Card icon='fa-user' number={this.state.totalCustomers} desciption='Tổng khách hàng' color='#d9534f'></Card>
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
                                <a className="nav-link active" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">
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
                            <div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
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
                                        {this.state.hot.map((value, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{value[0]}</th>
                                                    <td>{value[1]}</td>
                                                    <td>{value[2]}</td>
                                                    <td><Link to={`/productDetail/${value[0]}`} className="btn btn-success">Xem chi tiết</Link></td>
                                                </tr>
                                            )
                                        })}
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
                                        {this.state.not.map((value, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{value[0]}</th>
                                                    <td>{value[1]}</td>
                                                    <td>{value[2]}</td>
                                                    <td><Link to={`/productDetail/${value[0]}`} className="btn btn-success">Xem chi tiết</Link></td>
                                                </tr>
                                            )
                                        })}
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

export default withRouter(contentAdmin);