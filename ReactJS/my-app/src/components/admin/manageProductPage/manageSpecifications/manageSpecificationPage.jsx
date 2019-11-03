import React, { Component } from 'react';
import '../../../../css/sb-admin.css';
import Header from '../../headerAdmin';
// import Footer from '../footerAdmin';
import SildeBar from '../../slidebarAdmin';
import ManageSpecification from './manageSpecification';

class manageSpecificationPage extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <SildeBar>
                    <ManageSpecification></ManageSpecification>
                </SildeBar>
            </div>
        );
    }
}

export default manageSpecificationPage;