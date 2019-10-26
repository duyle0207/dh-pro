import React, { Component } from 'react';
import Header from "../headerAdmin";
import SildeBar from "../slidebarAdmin";
import ProductDetail from "../productDetailPage/productDetail";

class productDetailPage extends Component {
    render() {
        console.log(this.props.match.params.id);
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

export default productDetailPage;