import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

// var notLoginMessage = "not login";

// var isTokenValid = false;

function CheckAuthAdmin() {

    if (JSON.parse(localStorage.getItem("adminInfo")) === null) {
        localStorage.setItem("userInfo", JSON.stringify({}));
    }
    console.log(Object.keys(JSON.parse(localStorage.getItem("adminInfo"))).length);
    if (Object.keys(JSON.parse(localStorage.getItem("adminInfo"))).length === 0) {
        console.log("true")
        return true;
    }
    else {
        // const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
        console.log("false");
        return false;
    }
}

const ProtectLoginAdmin = ({ component: Component, ...rest }) => (
    
    <Route {...rest} render={(props) => {
        console.log("Route");
        return  CheckAuthAdmin()
            ? <Component {...props} />
            : <Redirect to='/admin' />
    }} />
)
export default ProtectLoginAdmin;