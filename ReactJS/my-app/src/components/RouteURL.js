import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./customer/dashboard/dashboard";
import ItemDetailPage from "../components/customer/item/itemDetailPage";
import Cart from "./customer/cart/cart";
import AdminDashboard from "./admin/adminDashboard";
import LoginPage from "./login";

class RouteURL extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component = {Dashboard} />
                <Route path="/itemDetail" component = {ItemDetailPage} />
                <Route path="/cart" component = {Cart} />
                <Route path="/admin" component = {AdminDashboard}/>
                <Route path="/login" component = {LoginPage}/>
            </Router>
        );
    }
}
export default RouteURL;