import React from 'react';
import Header from './header';
import Footer from './footer';
import Content from "./content";
import RouteURL from "./RouteURL";
class dashboard extends React.Component {
  render() {
    return (

      <RouteURL>
        <Header></Header>
      </RouteURL>

    );
  }
}

export default dashboard;
