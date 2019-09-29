import React from 'react';
import '../css/header.css';
import '../css/style.css';
import HeadContent from "../components/headContent";
import Item from "../components/item";

class content extends React.Component {
  render() {
    return (
      <div className="content">
        <HeadContent></HeadContent>
        <div className="list-laptop">
          <div className="container">
            <div className="row">
              <Item></Item>
              <Item></Item>
              <Item></Item>
              <Item></Item>
              <Item></Item>
              <Item></Item>
              <Item></Item>
              <Item></Item>
              <Item></Item>
              <Item></Item>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default content;
