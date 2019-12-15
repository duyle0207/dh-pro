import React, { Component } from 'react';
import '../../css/sb-admin.css';
import { Link } from 'react-router-dom'


class slidebarAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            active: {
                doanhThu: 'active',
                donHang: '',
                sanPham: '',
                linhKienMay: '',
            }
        });

        this.handleClickActive = this.handleClickActive.bind(this);
    }

    handleClickActive(event) {
        this.setState({
            active: {                   
                doanhThu: '',
                donHang: '',
                sanPham: '',
                linhKienMay: '',      
            }
        },()=>{
            console.log(this.state.active);
        });
        console.log(this.state.active);
        // this.setState({
        //     active: {
        //         doanhThu: '',
        //         donHang: '',
        //         sanPham: '',
        //         linhKienMay: '',
        //     }
        // });
        // const active = this.state.active;
        // active[event.target.name] = 'active';
        // this.setState({
        //     active: active
        // });
    }

    render() {
        return (
            <div id="wrapper">
                {/* Sidebar */}
                <ul className="sidebar navbar-nav">
                    <li className={"nav-item " + this.state.active.doanhThu} name="doanhThu" onClick={this.handleClickActive}>
                        <Link className="nav-link" to="/admin">
                            <i className="fas fa-fw fa-tachometer-alt" />
                            <span> Doanh thu</span>
                        </Link>
                    </li>
                    <li className={"nav-item " + this.state.active.donHang} name="donHang" onClick={this.handleClickActive}>
                        <Link className="nav-link" to="/order">
                            <i className="fas fa-money-bill-alt" />
                            <span>  Đơn hàng</span>
                        </Link>
                    </li>
                    <li className={"nav-item " + this.state.active.sanPham} name="sanPham" onClick={this.handleClickActive}>
                        <Link className="nav-link" to="/manageProduct">
                            <i className="fas fa-fw fa-table" />
                            <span> Sản phẩm</span>
                        </Link>
                    </li>
                    <li className={"nav-item " + this.state.active.linhKienMay} name="linhKienMay" onClick={this.handleClickActive}>
                        <Link className="nav-link" to="/manageSpecification">
                            <i class="fas fa-wrench"></i>
                            <span> Linh kiện máy</span>
                        </Link>
                    </li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

export default slidebarAdmin;