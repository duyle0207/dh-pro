import React from 'react';
import '../../../css/header.css';
import '../../../css/searchBox.css'
import Logo from "../../../images/logo.png";
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

class header extends React.Component {

  constructor(props) {
    super(props);

    this.loginModal = React.createRef();

    this.state = ({
      listSP: [],
      username: '',
      password: '',
      success: false,
      error: false,
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      isVisible: false,
      quantityCart: 0,
      isOnBlur: ''
    });
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleLogOutClick = this.handleLogOutClick.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnClickProduct = this.handleOnClickProduct.bind(this);
  }

  async onHandleChange(event) {
    var name = event.target.name;
    if (name === "username") {
      this.setState({ username: event.target.value });
    }
    else if (name === "password") {
      this.setState({ password: event.target.value });
    }
  }

  handleOnBlur()
  {
    // alert("alert")
    this.setState({isOnBlur: ''});
  }

  handleOnClickProduct()
  {
    this.setState({isOnBlur: 'block'});
  }

  async componentDidMount() {
    // console.log(this.loginModal.current.display);
    const totalQuantity = await (await fetch('/customerUnauthenticated/getAllQuantity')).json();
    console.log();
    this.setState({
      quantityCart: totalQuantity
    })
  }

  // handleOnBlur() {
  //   this.setState({ isVisible: false });
  //   console.log(this.state.isVisible);
  // }

  handleOnChange(event) {
    this.setState({ isVisible: true });
    fetch('/customerUnauthenticated/searchSPKH', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: (!event.target.value ? "%" : event.target.value)
    }).then(res => res.json()).then(result => {
      this.setState({ listSP: result });
    });
  }

  componentWillUpdate(nextState) {
    if (nextState.userInfo === this.state.userInfo) {
      console.log(nextState.userInfo)
    }
  }

  async onSubmitLogin(event) {
    event.preventDefault();

    await fetch(`/customerUnauthenticated/login?username=${this.state.username}&password=${this.state.password}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        this.setState({ error: false });
        return res.json();
      }
      else {
        this.setState({ error: true });
      }
    }).then(data => {
      // console.log(data !== undefined);
      if (data !== undefined) {
        localStorage.setItem("userInfo", JSON.stringify(data))
        this.setState({ userInfo: JSON.parse(localStorage.getItem("userInfo")) });
        console.log(this.state.userInfo);
      }
    });
  }

  async handleLogOutClick() {
    await fetch(`/customerUnauthenticated/logout`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    localStorage.setItem("userInfo", JSON.stringify({}));
    this.setState({ userInfo: JSON.parse(localStorage.getItem("userInfo")) });
    this.props.history.push('/');
  }
  
  render() {
    return (
      <div className="header">
        <nav className="navbar navbar-expand-md navbar-dark bg-color flex-column">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src={Logo} alt="" style={{ width: 100 }} />
            </Link>
            <div className="search" >
              <input type="text" onChange={this.handleOnChange} placeholder="Tìm kiếm" />
              <ul className="results my-2"  style={{ display: this.state.isOnBlur}}>
                {this.state.listSP.map((value) => {
                  return <a className="navbar-brand" onMouseEnter={this.handleOnClickProduct}
                  onMouseLeave={this.handleOnBlur}  href={"/itemDetail/" + value.id}><li>
                    <div className="row my-2">
                      <div className="col-sm-4">
                        <img width="100" height="100" src={require(`../../../SpringRestAPI/src/main/webapp/images/${value.hinh}`)} alt="" />
                      </div>
                      <div className="col-sm-8">
                        <div className="row">
                          {value.tenSP}
                        </div>
                        <div className="row">
                          <span style={{ color: "red" }}><b>{value.gia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b></span>
                        </div>
                      </div>
                    </div>
                  </li>
                  </a>
                }
                )}
              </ul>
            </div>
            <ul className="navbar-nav">
              <li className="nav-item mt-1 text-white mx-4">
                <div className="dropdown">
                  <div className="row">
                    <div className="col-sm-12 text-white">
                      {/* <button className="btn dropdown-toggle shadow-none text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sản phẫm đã xem (2)
                      </button> */}
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Đơn hàng của tôi</a>
                        <a className="dropdown-item" href="#">Tài khoản của tôi</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={this.handleLogOutClick} href="#">Đăng xuất</a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              {Object.keys(this.state.userInfo).length === 0 ?
                <li className="nav-item dropdown mr-4 mt-3">
                  <a
                    href={'/login'}
                    className="text-white text-decoration-none">
                    <p className="h5">Đăng nhập</p>
                  </a>
                  {/* <div className="dropdown-menu" aria-labelledby="user">
                    <a className="dropdown-item" data-toggle="modal" data-target="#login" href="#login">
                      Đăng nhập
                    </a>
                    <a className="dropdown-item" data-toggle="modal" data-target="#login" href="#login">
                      Đăng kí
                    </a>
                    <a className="dropdown-item" data-toggle="modal" data-target="#login" href="#login">
                      Quên mật khẩu
                    </a>
                  </div> */}
                </li>
                :
                <li className="nav-item mt-1 text-white">
                  <div className="dropdown">
                    <div className="row mt-1">
                      <div className="col-sm-2">
                        <img className="mt-1" width="30" height="30" src="https://image.flaticon.com/icons/svg/149/149071.svg"></img>
                      </div>
                      <div className="col-sm-10 text-white">
                        <button className="btn dropdown-toggle shadow-none text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Chào {this.state.userInfo.userName}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          {/* <a className="dropdown-item" href="#">Đơn hàng của tôi</a> */}
                          <a className="dropdown-item" href={'/accountInfo'}>Tài khoản của tôi</a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" onClick={this.handleLogOutClick} href="#">Đăng xuất</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              }
              <li className="nav-item">
                {/* <a href="/cart">
                  <i className="fas fa-shopping-cart fa-2x text-white">
                    <small style={{ fontSize: 14 }}> (2)</small>
                  </i>
                </a> */}
                <Link className="navbar-brand" to="/cart">
                  <img className="mt-1" width="40" height="40" src="https://image.flaticon.com/icons/svg/526/526737.svg"></img>
                </Link>
                {/* <b className="text-dark">({this.state.quantityCart})</b> */}
              </li>
            </ul>
            {/* <!-- The Modal --> */}
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(header);