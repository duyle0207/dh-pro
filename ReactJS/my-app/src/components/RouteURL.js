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

class RouteURL extends Component {

    checkAuth() {
        if (Object.keys(JSON.parse(localStorage.getItem("userInfo"))).length === 0) {
            return false;
        }
        else {
            return true;
        }
    }

    render() {
        return (
            <Router>
                <ScrollToTop>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/itemDetail/:id" component={ItemDetailPage} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/admin" component={AdminDashboard} />
                    <Route path="/login/:id" component={LoginPage} />
                    <Route path="/uploadFile" component={UpLoadFile} />
                    <Route path="/searchDemo" component={SearchDemo} />
                    <Route path="/compareItem/:id" component={CompareItemsPage} />
                    <Route path="/manageProduct" component={ManageProductPage} />
                    <Route path="/productDetail/:id" component={ProductDetailPage} />
                    <Route path="/validate" component={Validate} />
                    <Route path="/products" component={ProductFilter} />
                    <Route path="/manageSpecification" component={ManageSpecificationPage} />
                    <Route path="/404" component={Error} />

                    <ProtectLogin path="/login" isLogin={!this.checkAuth()} component={LoginPage} />

                    <Route path="/loginAdmin" component={LoginAdminPage} />

                    <Route></Route>

                    <PrivateRoute path='/protected' isLogin={this.checkAuth()} component={AdminDashboard} />
                    
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

const ProtectLogin = ({ component: Component, isLogin, ...rest }) => (
    <Route {...rest} render={(props) => (
        isLogin
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
)

export default RouteURL;