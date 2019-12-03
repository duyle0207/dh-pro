import React, { Component } from 'react';
import Header from "../headerAdmin";
import SildeBar from "../slidebarAdmin";
import ProductDetail from "../productDetailPage/productDetail";
import { withRouter, Redirect} from 'react-router';

class productDetailPage extends Component {

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
        this.setState({isAuthenticated: isTokenValid},()=>{
            if(!this.state.isAuthenticated)
            {
                this.props.history.push('/loginAdmin?message=tokenexpired');   
            }
        });
    }

    render() {
        console.log(this.props.match.params.id);
        if(!this.state.isAuthenticated)
        {
            return <Redirect to='/loginAdmin?message=tokenexpired'></Redirect>
        }
        else {
            if(this.state.isAuthenticated)
            {
                return (
                    <div>
                        <Header></Header>
                        <SildeBar>
                            <ProductDetail idProduct={this.props.match.params.id}></ProductDetail>
                        </SildeBar>
                    </div>
                );
            }
        }
    }
}

export default withRouter(productDetailPage);