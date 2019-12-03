import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";


function checkAuth() {
    if (JSON.parse(localStorage.getItem("userInfo")) === null) {
        localStorage.setItem("userInfo", JSON.stringify({}));
    }
    if (Object.keys(JSON.parse(localStorage.getItem("userInfo"))).length === 0) {
        return false;
    }
    else {
        return true;
    }
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        checkAuth()
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)
export default ProtectedRoute;