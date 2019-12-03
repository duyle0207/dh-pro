import React, { Component } from 'react';
import '../../../../css/sb-admin.css';
import Header from '../../headerAdmin';
// import Footer from '../footerAdmin';
import SildeBar from '../../slidebarAdmin';
import ManageSpecification from './manageSpecification';
import { withRouter, Redirect } from 'react-router';

class manageSpecificationPage extends Component {

    constructor(props)
    {
        super(props);

        this.state = ({
            isAuthenticated: 1
        });
    }

    async componentWillMount()
    {
        const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
        console.log(JSON.parse(localStorage.getItem("adminInfo")).accessToken);
        this.setState({isAuthenticated: isTokenValid});
    }

    render() {
        if(!this.state.isAuthenticated)
        {
            localStorage.removeItem("adminInfo");
            return <Redirect to='/loginAdmin?message=tokenexpired'></Redirect>
        }
        else {
            if(this.state.isAuthenticated)
            {
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
    }
}

export default withRouter(manageSpecificationPage);