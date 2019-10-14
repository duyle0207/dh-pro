import React, { Component } from 'react';
import '../../../css/sb-admin.css';
import Header from '../headerAdmin';
import Footer from '../footerAdmin';
import SildeBar from '../slidebarAdmin';
import ManageProduct from './manageProduct';

class manageProductPage extends Component {

    render() {
        return (
            <div>
                <Header></Header>
                <SildeBar>
                    <ManageProduct></ManageProduct>
                </SildeBar>
                <Footer></Footer>
            </div>
        );
    }
}

export default manageProductPage;