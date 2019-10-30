import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./customer/dashboard/dashboard";
import ItemDetailPage from "../components/customer/item/itemDetailPage";
import Cart from "./customer/cart/cart";
import AdminDashboard from "./admin/adminDashboard";
import LoginPage from "./login";
import UpLoadFile from "./uploadFile";
import SearchDemo from "../searchDemo";
import CompareItemsPage from "./customer/compareItem/compareItemsPage";
import ManageProductPage from "./admin/manageProductPage/manageProductPage";
import ProductDetailPage from "./admin/productDetailPage/productDetailPage";
import Validate from "./validate";
import ProtectedRoute from "./router/PrivateRoute";

import ProductFilter from "./customer/product/product";
class RouteURL extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component = {Dashboard} />
                <Route path="/itemDetail/:id" component = {ItemDetailPage} />
                <Route path="/cart" component = {Cart} />
                <Route path="/admin" component = {AdminDashboard}/>
                <Route path="/login/:id" component = {LoginPage}/>
                <Route path="/uploadFile" component = {UpLoadFile}/>
                <Route path="/searchDemo" component = {SearchDemo}/>
                <Route path="/compareItem" component = {CompareItemsPage}/>
                <Route path="/manageProduct" component = {ManageProductPage}/>
                <Route path="/productDetail/:id" component = {ProductDetailPage}/>
                <Route path="/validate" component = {Validate}/>
                <ProtectedRoute path="/example" loggedIn={false} component={AdminDashboard} />
                <Route path="/products" component = {ProductFilter}/>
            </Router>
        );
    }
}
export default RouteURL;