import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

// var notLoginMessage = "not login";

// var isTokenValid = false;

function CheckAuthAdmin() {

    if (JSON.parse(localStorage.getItem("adminInfo")) === null) {
        localStorage.setItem("adminInfo", JSON.stringify({}));
    }
    console.log(JSON.parse(localStorage.getItem("adminInfo")) === null);
    console.log(Object.keys(JSON.parse(localStorage.getItem("adminInfo"))).length);
    if (Object.keys(JSON.parse(localStorage.getItem("adminInfo"))).length === 0) {
        return true;
    }
    else {
        // const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
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