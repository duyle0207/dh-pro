import React, { Component } from 'react';
import '../../css/sb-admin.css';
import { Link } from 'react-router-dom'


class slidebarAdmin extends Component {
    render() {
        return (
            <div id="wrapper">
                {/* Sidebar */}
                <ul className="sidebar navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/admin">
                            <i className="fas fa-fw fa-tachometer-alt" />
                            <span> Doanh thu</span>
                        </Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/order">
                            <i className="fas fa-money-bill-alt" />
                            <span>  Đơn hàng</span>
                        </Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/manageProduct">
                            <i className="fas fa-fw fa-table" />
                            <span> Sản phẩm</span>
                        </Link>
                    </li>
                    <li className="nav-item active">
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