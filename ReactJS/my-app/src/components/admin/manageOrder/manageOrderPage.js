import React, { Component, Fragment } from 'react';
import ManageOrder from './manageOrder';
import Headers from '../headerAdmin';
import SildeBar from '../slidebarAdmin';
import { withRouter,Redirect} from 'react-router';

export class ManageOrderPage extends Component {

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
            return <Redirect to='/loginAdmin?message=tokenexpired'></Redirect>
        }
        else {
            if(this.state.isAuthenticated)
            {
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
    }
}

export default withRouter(ManageOrderPage);
