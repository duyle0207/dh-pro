import React, { Component } from 'react';
import RegisterForm from './registerForm';
import Header from '../dashboard/header';
import Footer from '../dashboard/footer';

export class register extends Component {
    render() {
        return (
            <React.Fragment>
                <Header></Header>
                <RegisterForm></RegisterForm>
                <Footer></Footer>
            </React.Fragment>
        );
    }
}

export default register;
