import React from 'react';
import '../css/header.css';
import '../css/style.css';
import HeadContent from "./headContent";
import ItemDetail from "./itemDetail";
import Header from './header';
import Footer from './footer';

class ItemDetailPage extends React.Component {
  render() {
    return (
      <div>
        <Header></Header>
        <div className="container" style={{ paddingTop: 50 }}>
          <div className="card">
            <ItemDetail></ItemDetail>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default ItemDetailPage;
