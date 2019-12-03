import React from 'react';
import Header from './header';
import Footer from './footer';
import Content from "./content";
class dashboard extends React.Component {

  async validateAccessToken(jwt)
    {   
        const isAccessTokenValid = await( await fetch(`/customerUnauthenticated/validateJWT/${jwt}`) ).json();
        return isAccessTokenValid;
    }

  render() {
    return (
        <div className="App">
          {/* <RouteURL></RouteURL> */}
          <Header></Header>
          {/* <h1></h1> */}
          <Content></Content>
          <Footer></Footer>
        </div>

    );
  }
}

export default dashboard;
