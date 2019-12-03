import React, { Component } from 'react';
import '../../css/sb-admin.css';
import { withRouter  } from 'react-router';

class headerAdmin extends Component {


    constructor(props)
    {
        super(props);

        this.state = ({
            adminInfo: JSON.parse(localStorage.getItem("adminInfo"))
        })

        this.handleLogOutClick = this.handleLogOutClick.bind(this);
    }

    async handleLogOutClick() {
        await fetch(`/customerUnauthenticated/logout`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        localStorage.setItem("adminInfo", JSON.stringify({}));
        this.setState({ userInfo: JSON.parse(localStorage.getItem("adminInfo")) });
        this.props.history.push('/loginAdmin')
      }
    render() {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
                <a className="navbar-brand mr-1" href="/manageProduct">DHPro Management</a>
                {/* Navbar Search */}
                <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                    <div className="input-group">
                        {/* <input type="text" className="form-control" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" /> */}
                        <div className="input-group-append">
                            {/* <button className="btn btn-primary" type="button">
                                <i className="fas fa-search" />
                            </button> */}
                            <a href="/productDetail/new" className="btn btn-danger"><b>Thêm mới</b></a>
                        </div>
                    </div>
                </form>
                {/* Navbar */}
                <ul className="navbar-nav ml-auto ml-md-0">
                    <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#aaa" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div className="row mt-1">
                                <div className="col-sm-4">
                                    <i className="fas fa-user-circle fa-fw" />
                                </div>
                                <div className="col-sm-8">
                                    <p className="h6">{JSON.parse(localStorage.getItem("adminInfo")).userName}</p>
                                </div>
                            </div>
                            
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                            {/* <a className="dropdown-item" href="#aa">Settings</a>
                            <a className="dropdown-item" href="#aa">Activity Log</a> */}
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="#aa" data-toggle="modal" onClick={this.handleLogOutClick} data-target="#logoutModal">Đăng xuất</a>
                        </div>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default withRouter(headerAdmin);