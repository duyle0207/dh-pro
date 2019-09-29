import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from "./dashboard";
import ItemDetailPage from "./itemDetailPage";

class RouteURL extends Component {
    render() {
        return (
            <Router>
                <Route path="/" component = {Dashboard} />
                <Route path="/itemDetail" component = {ItemDetailPage} />
            </Router>
        );
    }
}
export default RouteURL;