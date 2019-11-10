import React, { Component } from 'react';
import Header from '../dashboard/header';
import Footer from '../dashboard/footer';
import LoginForm from './loginForm';

class login extends Component {
    render() {
        return (
            <React.Fragment>
                <Header></Header>
                <LoginForm></LoginForm>
                <Footer></Footer>
            </React.Fragment>
        );
    }
}

export default login;