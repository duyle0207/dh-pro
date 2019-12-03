import React, { Component } from 'react';
import '../../../css/style.css';
import InfoCartCustomer from './infoCartCustomer';
import { withRouter } from 'react-router';
import PaypalCheckoutButton from '../../PaypalCheckoutButton';

class cartInfo extends Component {

    hoaDon = {
        "id": '',
        "khachHang": '',
        "tenKH": "",
        "diaChi": "",
        "soDT": "",
        "ngayMuaHang": "",
        "tongTien": '',
        "phuongThucThanhToan": 1,
        "ten": ""
    }

    constructor(props) {
        super(props);
        // console.log(JSON.parse(localStorage.getItem("userInfo")));

        this.state = ({
            visibleInfoCus: false,
            cartQuantity: 0,
            amount: 0,
            pttt: '',
            hoaDon: {
                id: '',
                khachHang: {},
                tenKH: "",
                diaChi: "",
                soDT: "",
                ngayMuaHang: this.getCurrentDate(),
                tongTien: '',
                phuongThucThanhToan: {
                    id: "",
                    tenPhuongThucThanhToan: ""
                },
                ten: ""
            },
            isCheckoutOnline: false,
            order: {
                customer: 'Test',
                total: 0,
                items: [
                    // {
                    //     name: 'hat',
                    //     description: 'Brown hat.',
                    //     quantity: '5',
                    //     price: '3',
                    //     tax: '0.01',
                    //     sku: '1',
                    //     currency: 'USD'
                    // },
                    // {
                    //     name: 'handbag',
                    //     description: 'Black handbag.',
                    //     quantity: '1',
                    //     price: '15',
                    //     tax: '0.02',
                    //     sku: 'product34',
                    //     currency: 'USD'
                    // }
                ]
            }
        });

        this.handleInfoCus = this.handleInfoCus.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.saveHoaDon = this.saveHoaDon.bind(this);
    }

    getCurrentDate() {
        var d = new Date();

        var dd = String(d.getDate()).padStart(2, '0');
        var mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = d.getFullYear();

        // console.log();

        return String(yyyy + '-' + mm + '-' + dd);
    }

    items = [];

    async componentDidMount() {

        console.log(this.props.cartLines);

        const cartQuantity = await (await fetch(`/customerUnauthenticated/getAllQuantity`)).json();
        const amount = await (await fetch(`/customerUnauthenticated/getAmount`)).json();
        this.setState({
            cartQuantity: cartQuantity,
            amount: amount
        });
        if (JSON.parse(localStorage.getItem("userInfo")).userName) {
            const customer = await (await fetch(`/customerUnauthenticated/getCustomerByUsername/${JSON.parse(localStorage.getItem("userInfo")).userName}`)).json();
            this.setState({
                hoaDon: {
                    ...this.state.hoaDon,
                    khachHang: customer,
                    ten: customer.ten,
                    email: customer.email,
                    soDT: customer.soDT,
                    diaChi: customer.diaChi
                }
            });
        }

        // console.log(this.props.cartLines);
        
        console.log(this.items);
        this.props.cartLines.forEach(element => {

            var item = {
                name: '',
                description: 'Test',
                quantity: 0,
                price: '',
                tax: '0.02',
                sku: 'product',
                currency: 'USD'
            };

            item['name'] = element.sanPham.tenSP;
            item['quantity'] = element.soLuong;
            item['price'] = (element.tongTien/23000).toFixed(2);

            this.items.push(item);
        });

        // console.log(this.items);
        this.setState({order:{
            customer: '1',
            total: (this.state.amount/10000).toFixed(2),
            items: this.items
        }},()=>{
            console.log(this.state.order);
        })
    }

    async handleOnChange(event) {

        if (event.target.id === "customRadio2") {
            var hd = this.state.hoaDon;
            hd['phuongThucThanhToan'] = 1;
            this.setState({ isCheckoutOnline: true, hoaDon: hd });
        }
        else {
            var hd = this.state.hoaDon;
            hd['phuongThucThanhToan'] = 2;
            this.setState({ isCheckoutOnline: false, hoaDon: hd });
        }

        console.log(this.state.hoaDon);
    }

    async saveHoaDon(event) {
        event.preventDefault();
        if (this.checkAuth()) {
            const customer = await (await fetch(`/customerUnauthenticated/getCustomerByUsername/${JSON.parse(localStorage.getItem("userInfo")).userName}`)).json();
            const pttt = await (await fetch(`/customerUnauthenticated/getPhuongThucThanhToan/${this.state.hoaDon.phuongThucThanhToan}`)).json();
            this.setState({
                hoaDon: {
                    ...this.state.hoaDon,
                    khachHang: customer,
                    phuongThucThanhToan: pttt,
                    tongTien: this.state.amount
                }
            });
            console.log(this.state.hoaDon);
            await fetch(`/customerUnauthenticated/saveHoaDon`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.hoaDon)
            }).then((res) => {
                this.props.history.push("/")
            });
        }
        else {
            // alert("Đăng nhập để thực hiện thanh toán");
            this.props.history.push("/login");
        }
    }

    checkAuth() {
        if (JSON.parse(localStorage.getItem("userInfo")) === null) {
            localStorage.setItem("userInfo", JSON.stringify({}));
        }
        if (Object.keys(JSON.parse(localStorage.getItem("userInfo"))).length === 0) {
            return false;
        }
        else {
            return true;
        }
    }

    handleInfoCus() {
        this.setState({ visibleInfoCus: !this.state.visibleInfoCus })
    }

    render() {

        return (
            <div className="container">
                <form onSubmit={this.saveHoaDon}>
                    <div className="row">
                        <div className="col-sm-8">
                            <nav class="navbar navbar-light bg-light mt-4">
                                <span class="navbar-brand mb-0 h1">
                                    THÔNG TIN KHÁCH HÀNG
                            </span>
                            </nav>
                            <div className="col-sm-12">
                                <div className="mt-4">
                                    <InfoCartCustomer hoaDon={this.state.hoaDon} handleOnChange={this.handleOnChange}></InfoCartCustomer>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <nav class="navbar navbar-light bg-light mt-4">
                                <span class="navbar-brand mb-0 h1">
                                    PHƯƠNG THỨC THANH TOÁN
                                </span>
                            </nav>
                            {/* <div class="form-check mx-4 my-4">
                                <input className="form-check-input shadow-none" width="50px" height="50px"
                                    type="radio" name="tructuyen" onChange={this.handleOnChange} id="exampleRadios1" value="1" required />
                                <p className="h6 form-check-label" for="exampleRadios1" >
                                    Thanh toán tiền mặt khi nhận hàng
                            </p>
                            </div>
                            <div className="form-check mx-4 my-4">
                                <input className="form-check-input shadow-none" width="50px" height="50px" type="radio" name="online" onChange={this.handleOnChange} id="exampleRadios2" value="2" required />
                                <p className="h6 form-check-label" for="exampleRadios2">
                                    Thanh toán trực tuyến
                            </p>
                            </div> */}
                            <div className="custom-control custom-radio my-4">
                                <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input" onChange={this.handleOnChange} />
                                <label className="custom-control-label" htmlFor="customRadio1">
                                    <p className="h6 form-check-label" htmlFor="exampleRadios1" >
                                        Thanh toán tiền mặt khi nhận hàng
                                    </p>
                                </label>
                            </div>
                            <div className="custom-control custom-radio my-4">
                                <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input" onChange={this.handleOnChange} />
                                <label className="custom-control-label" htmlFor="customRadio2">
                                    <p className="h6 form-check-label" htmlFor="exampleRadios1" >
                                        Thanh toán trực tuyến
                                    </p>
                                </label>
                            </div>
                            <div className="row ml-2">
                                <div className="col-sm-6">
                                    <p className="info-cart">Tổng sản phẩm:</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="total-cart">
                                        {this.state.cartQuantity}
                                    </p>
                                </div>
                            </div>
                            <div className="row ml-2">
                                <div className="col-sm-6">
                                    <p className="info-cart">Thành tiền</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="h4 total-cart text-danger">
                                        {(this.state.amount).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                    </p>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-sm-6"></div>
                                <div className="col-sm-6">
                                    {this.state.isCheckoutOnline ?
                                        <PaypalCheckoutButton
                                            order={this.state.order}
                                        /> :
                                        <button type="submit" className="btn btn-danger"
                                            style={{ width: '100%' }}>
                                            Thanh toán
                                    </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(cartInfo);