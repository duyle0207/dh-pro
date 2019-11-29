import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Dashboard from "./customer/dashboard/dashboard";
import ItemDetailPage from "../components/customer/item/itemDetailPage";
import Cart from "./customer/cart/cart";
import AdminDashboard from "./admin/adminDashboard";
// import LoginPage from "./login";
import UpLoadFile from "./uploadFile";
import SearchDemo from "../searchDemo";
import CompareItemsPage from "./customer/compareItem/compareItemsPage";
import ManageProductPage from "./admin/manageProductPage/manageProductPage";
import ProductDetailPage from "./admin/productDetailPage/productDetailPage";
import Validate from "./validate";
import Error from '../components/commonComponents/Error';
import ManageSpecificationPage from "./admin/manageProductPage/manageSpecifications/manageSpecificationPage";
import ScrollToTop from "./scrollToTop";
import LoginPage from '../components/customer/login/login';
import LoginAdminPage from '../components/admin/login/login';
import ProductFilter from "./customer/product/product";
import AccountInfoPage from "./customer/accountInfo/accountInfoPage/accountInfoPage";
import RegisterPage from "./customer/login/register";
import ManageOrderPage from './admin/manageOrder/manageOrderPage';

import Paypal from './paypalDemo';

class RouteURL extends Component {

    checkAuth() {
        if(JSON.parse(localStorage.getItem("userInfo"))===null)
        {
            localStorage.setItem("userInfo",JSON.stringify({}));
        }
        if (Object.keys(JSON.parse(localStorage.getItem("userInfo"))).length === 0) {
            return false;
        }
        else {
            return true;
        }
    }

    checkAuthAdmin()
    {
        if(JSON.parse(localStorage.getItem("adminInfo"))===null)
        {
            localStorage.setItem("adminInfo",JSON.stringify({}));
        }
        if (Object.keys(JSON.parse(localStorage.getItem("adminInfo"))).length === 0) {
            return false;
        }
        else {
            return true;
        }
    }

    componentDidUpdate(){
        console.log('New Route', this.checkAuth());
    }

    render() {
        return (
            <Router>
                <ScrollToTop>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/itemDetail/:id" component={ItemDetailPage} />
                    <Route path="/cart" component={Cart} />
                    
                    <Route path="/login/:id" component={LoginPage} />
                    <Route path="/uploadFile" component={UpLoadFile} />
                    <Route path="/searchDemo" component={SearchDemo} />
                    <Route path="/compareItem/:id" component={CompareItemsPage} />
                    
                    <Route path="/productDetail/:id" component={ProductDetailPage} />
                    <Route path="/validate" component={Validate} />
                    <Route path="/products" component={ProductFilter} />
                    
                    <Route path="/404" component={Error} />

                    <ProtectLogin path="/login" isLogin={!this.checkAuth()} component={LoginPage} />

                    <Route path="/loginAdmin" component={LoginAdminPage} />

                    <Route path="/register" component={RegisterPage}/>

                    {/* <PrivateRoute path='/protected' isLogin={this.checkAuth()} component={AdminDashboard} /> */}

                    <PrivateRoute path='/accountInfo' isLogin={this.checkAuth()} component={AccountInfoPage} />

                    {/* Admin */}
                    <PrivateRouteAdmin path="/admin" isLogin={this.checkAuthAdmin()} component={AdminDashboard} />
                    <PrivateRouteAdmin path="/manageProduct" isLogin={this.checkAuthAdmin()} component={ManageProductPage} />
                    <PrivateRouteAdmin path="/manageSpecification" isLogin={this.checkAuthAdmin()} component={ManageSpecificationPage} />
                    <PrivateRouteAdmin path="/order" isLogin={this.checkAuthAdmin()} component={ManageOrderPage} />



                    <Route path="/paypal" component={Paypal} />
                </ScrollToTop>
            </Router>
        );
    }
}

const PrivateRoute = ({ component: Component, isLogin, ...rest }) => (
    <Route {...rest} render={(props) => (
        isLogin
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

const PrivateRouteAdmin = ({ component: Component, isLogin, ...rest }) => (
    <Route {...rest} render={(props) => (
        isLogin
            ? <Component {...props} />
            : <Redirect to='/loginAdmin' />
    )} />
)

const ProtectLogin = ({ component: Component, isLogin, ...rest }) => (
    <Route {...rest} render={(props) => (
        isLogin
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
)

export default RouteURL;
