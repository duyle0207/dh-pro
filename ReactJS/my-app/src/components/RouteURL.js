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

import PrivateRoute from './router/PrivateRoute';
import PrivateRouteAdmin from './router/PrivateRouteAdmin';
import Paypal from './paypalDemo';


class RouteURL extends Component {

    constructor(props)
    {
        super(props);

        // console.log(this.props.);

        this.createLocalStorage();

        this.state = ({
            isLogin: false,
        })
    }

    async componentDidMount()
    {
       
    }

    createLocalStorage()
    {
        if(JSON.parse(localStorage.getItem("adminInfo"))===null)
        {
            localStorage.setItem("adminInfo",JSON.stringify({}));
        }
        if(JSON.parse(localStorage.getItem("userInfo"))===null)
        {
            localStorage.setItem("userInfo",JSON.stringify({}));
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        console.log(prevProps.location.pathname);
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
                    
                    <Route path="/validate" component={Validate} />
                    <Route path="/products" component={ProductFilter} />
                    
                    <Route path="/404" component={Error} />

                    <ProtectLogin path="/login" isLogin={true} component={LoginPage} />

                    <Route path="/register" component={RegisterPage}/>

                    {/* <PrivateRoute path='/protected' isLogin={this.checkAuth()} component={AdminDashboard} /> */}

                    <PrivateRoute path='/accountInfo' component={AccountInfoPage} />

                    {/* Admin */}
                    <Route path="/loginAdmin" component={LoginAdminPage} />
                    <PrivateRouteAdmin path="/admin" component={AdminDashboard} />
                    <PrivateRouteAdmin path="/manageProduct" component={ManageProductPage} />
                    <PrivateRouteAdmin path="/manageSpecification" component={ManageSpecificationPage} />
                    <PrivateRouteAdmin path="/order" component={ManageOrderPage} />
                    <PrivateRouteAdmin path="/productDetail/:id" component={ProductDetailPage} />

                    <Route path="/paypal" component={Paypal} />
                </ScrollToTop>
            </Router>
        );
    }
}

// const PrivateRoute = ({ component: Component, isLogin, ...rest }) => (
//     <Route {...rest} render={(props) => (
//         isLogin
//             ? <Component {...props} />
//             : <Redirect to='/login' />
//     )} />
// )

// const PrivateRouteAdmin = ({ component: Component, isLogin, ...rest }) => (
//     <Route {...rest} render={(props) => (
//         JSON.parse(localStorage.getItem("adminInfo")).accessToken
//             ? <Component {...props} />
//             : <Redirect to='/loginAdmin' />
//     )} />
// )

const ProtectLogin = ({ component: Component, isLogin, ...rest }) => (
    <Route {...rest} render={(props) => (
        isLogin
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
)

export default RouteURL;
