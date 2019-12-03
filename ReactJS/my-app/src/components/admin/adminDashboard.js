import React, { Component } from 'react';
import '../../css/sb-admin.css';
import Header from './headerAdmin';
// import Footer from './footerAdmin';
import SildeBar from './slidebarAdmin';
import Content from './contentAdmin';
import { withRouter, Redirect} from 'react-router';

class adminDashboard extends Component {

    constructor(props)
    {
        super(props);

        this.state = ({
            isAuthenticated: 1
        });
    }

    async componentWillMount()
    {
        console.log("will mount");
        const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
        this.setState({isAuthenticated: isTokenValid});
        console.log(this.state.isAuthenticated);
    }
    
    render() {
        console.log("Isauth: "+ this.state.isAuthenticated);
        if(!this.state.isAuthenticated)
        {
            return <Redirect to='/loginAdmin?message=tokenexpired'></Redirect>
        }
        else{
            if(this.state.isAuthenticated)
            {
                return (
                    <div>
                        <Header></Header>
                        <SildeBar>
                            <Content></Content>
                        </SildeBar>
                        {/* <Footer></Footer> */}
                    </div>
                );
            }
        }
    }
}

export default withRouter(adminDashboard);