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

class RouteURL extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component = {Dashboard} />
                <Route path="/itemDetail" component = {ItemDetailPage} />
                <Route path="/cart" component = {Cart} />
                <Route path="/admin" component = {AdminDashboard}/>
                <Route path="/login/:id" component = {LoginPage}/>
                <Route path="/uploadFile" component = {UpLoadFile}/>
                <Route path="/searchDemo" component = {SearchDemo}/>
                <Route path="/compareItem" component = {CompareItemsPage}/>
            </Router>
        );
    }
}
export default RouteURL;