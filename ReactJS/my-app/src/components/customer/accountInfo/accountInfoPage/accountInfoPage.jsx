import React, { Component } from 'react';
import Header from '../../dashboard/header';
import Footer from '../../dashboard/footer';
import OrderList from '../order';
import Profile from '../profile';

class accountInfoPage extends Component {

    constructor(props)
    {
        super(props);
        this.state = ({
            isViewOrder: false,
            isViewProfile: true,
            customer: {}
        });
        this.handleViewOrder = this.handleViewOrder.bind(this);
        this.handleViewProfile = this.handleViewProfile.bind(this)
    }

    async componentDidMount()
    {
        const customer = await (await fetch(`/customerUnauthenticated/getCustomerByUsername/${JSON.parse(localStorage.getItem("userInfo")).userName}`)).json();
        this.setState({
            customer: customer
        });
        // console.log(this.props.match.params);
    }

    handleViewOrder()
    {
        this.setState({
            isViewOrder: true,
            isViewProfile: false
        });
    }

    
    handleViewProfile()
    {
        this.setState({
            isViewOrder: false,
            isViewProfile: true
        });
    }

    render() {
        return (
            <React.Fragment>
                <Header></Header>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <nav className="navbar navbar-light bg-light mt-4">
                                    <span className="navbar-brand mb-0 h1">
                                        Tài khoản của {JSON.parse(localStorage.getItem("userInfo")).userName}
                                    </span>
                                </nav>
                                <a className="nav-link bg-light text-dark my-2" onClick={this.handleViewProfile} id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <i className="fas fa-user fa-2x" /> 
                                        </div>
                                        <div className="col-sm-10 mt-1">
                                            Tài khoản của bạn
                                        </div>
                                    </div>
                                </a>
                                <a className="nav-link bg-light text-dark my-2" onClick={this.handleViewOrder} id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile ng-warning" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <i className="far fa-file fa-2x"/>
                                        </div>
                                        <div className="col-sm-10 mt-1">
                                            Quản lý đơn hàng
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-8 mt-4" style={{ height: '800px' }}>
                            {this.state.isViewOrder?
                            <OrderList customer={this.state.customer}></OrderList>
                            :
                            ""
                            }
                            {this.state.isViewProfile?
                            <Profile></Profile>
                            :
                            ""
                            }
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </React.Fragment>
        );
    }
}

export default accountInfoPage;