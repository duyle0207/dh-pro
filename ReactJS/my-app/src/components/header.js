import React from 'react';
import '../css/header.css';
import Logo from "../images/logo.png";

class header extends React.Component {
  render() {
    return (
      <div className="header">
        <nav className="navbar navbar-expand-md navbar-dark bg-color flex-column">
          <div className="container">
            <a className="navbar-brand" href="/">
              <img src={Logo} alt="" style={{ width: 100 }} />
            </a>
            <form className="form-inline my-2 my-lg-0 input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Bạn muốn tìm gì?"
              />
              <div className="input-group-prepend">
                <a className="input-group-text text-decoration-none" href="#abc">
                  <i className="fas fa-search fa-1x" />
                </a>
              </div>
            </form>
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item dropdown ml-4">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#abc"
                  id="dropdownId"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Sản phẩm đã xem (2){" "}
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownId">
                  <a className="dropdown-item" href="#abc">
                    Sản phẩm 1
                  </a>
                  <a className="dropdown-item" href="#abc">
                    Sản phẩm 2
                  </a>
                </div>
              </li>
              <li className="nav-item ml-4">
                <i className="fas fa-user fa-2x text-white" />
              </li>
              <li className="nav-item ml-4">
                <i className="fas fa-shopping-cart fa-2x text-white">
                  <small style={{ fontSize: 14 }}>(2)</small>
                </i>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default header;
