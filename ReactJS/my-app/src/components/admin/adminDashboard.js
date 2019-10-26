import React, { Component } from 'react';
import '../../css/sb-admin.css';
import Header from './headerAdmin';
import Footer from './footerAdmin';
import SildeBar from './slidebarAdmin';
import Content from './contentAdmin';

class adminDashboard extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <SildeBar>
                    <Content>></Content>
                </SildeBar>
                <Footer></Footer>
            </div>
        );
    }
}

export default adminDashboard;