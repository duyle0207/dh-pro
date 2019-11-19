import React, { Component } from 'react';
import Header from '../dashboard/header';
import Footer from '../dashboard/footer';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';

class login extends Component {
    render() {
        return (
            <React.Fragment>
                <Header></Header>
                <LoginForm></LoginForm>
                <RegisterForm></RegisterForm>
                <Footer></Footer>
            </React.Fragment>
        );
    }
}

export default login;