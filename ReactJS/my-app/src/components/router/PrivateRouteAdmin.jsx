import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

// var notLoginMessage = "not login";

// var isTokenValid = false;

async function CheckAuthAdmin() {

    if (JSON.parse(localStorage.getItem("adminInfo")) === null) {
        localStorage.setItem("adminInfo", JSON.stringify({}));
    }
    if (Object.keys(JSON.parse(localStorage.getItem("adminInfo"))).length === 0) {
        return false
    }
    else {
        // const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
        return true;
    }
}

// function CheckAuthAdminImpl()
// {
//     return CheckAuthAdmin();
// }

const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
    
    <Route {...rest} render={(props) => {
        return  CheckAuthAdmin()
            ? <Component {...props} />
            : <Redirect to='/loginAdmin?message' />
    }} />
)
export default PrivateRouteAdmin;