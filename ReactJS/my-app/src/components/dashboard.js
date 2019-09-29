import React from 'react';
import Header from './header';
import Footer from './footer';
import Content from "./content";

class dashboard extends React.Component{
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
      </div>
    );
  }
}

export default dashboard;
