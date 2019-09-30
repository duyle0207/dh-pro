import React, { Component } from 'react';
import '../../css/sb-admin.css';
import Header from './headerAdmin';
import Footer from './footerAdmin';
import SildeBar from './slidebarAdmin';

class adminDashboard extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <SildeBar></SildeBar>
                <Footer></Footer>
            </div>
        );
    }
}

export default adminDashboard;