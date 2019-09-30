import React, { Component } from 'react';
import '../../css/sb-admin.css';
import Content from './contentAdmin';

class slidebarAdmin extends Component {
    render() {
        return (
            <div id="wrapper">
                {/* Sidebar */}
                <ul className="sidebar navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="index.html">
                            <i className="fas fa-fw fa-tachometer-alt" />
                            <span> Doanh thu</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="charts.html">
                            <i className="fas fa-fw fa-chart-area" />
                            <span> Nhân viên</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="tables.html">
                            <i className="fas fa-fw fa-table" />
                            <span> Sản phẩm</span></a>
                    </li>
                </ul>
                <Content></Content>
            </div>
        );
    }
}

export default slidebarAdmin;