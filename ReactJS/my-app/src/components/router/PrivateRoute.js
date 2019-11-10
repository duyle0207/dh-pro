import React, { Component } from 'react';
import { BrowserRouter as Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        <Component {...props} />
    )} />
  )
export default ProtectedRoute;