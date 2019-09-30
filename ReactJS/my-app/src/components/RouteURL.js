import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import ItemDetailPage from "./itemDetailPage";
import Cart from "./cart";
class RouteURL extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component = {Dashboard} />
                <Route path="/itemDetail" component = {ItemDetailPage} />
                <Route path="/cart" component = {Cart} />
            </Router>
        );
    }
}
export default RouteURL;