import React, { Component, Fragment } from 'react';
import ManageOrder from './manageOrder';
import Headers from '../headerAdmin';
import SildeBar from '../slidebarAdmin';

export class ManageOrderPage extends Component {
    render() {
        return (
            <Fragment>
                <Headers></Headers>
                <SildeBar>
                    <ManageOrder></ManageOrder>
                </SildeBar>
            </Fragment>
        );
    }
}

export default ManageOrderPage;
