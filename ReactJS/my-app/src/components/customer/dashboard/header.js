import React from 'react';
import '../../../css/header.css';
import '../../../css/searchBox.css'
import Logo from "../../../images/logo.png";
import { Link, Redirect} from 'react-router-dom';

class header extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
      listSP: []
    });
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
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

  async componentDidMount() {

  }

  handleRedirect(id)
  {
    alert(id);
    return <Redirect to={'/itemDetail/'+id}  />
  }

  handleOnChange(event) {
    fetch('/searchSPKH', {
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

  async onSubmitLogin(event) {
    event.preventDefault();
    let details = {
      'username': this.state.username,
      'password': this.state.username
    };

    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    await fetch('/j_spring_security_check', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer token',
        'Content-Type': 'application/x-www-form-urlencoded',
        "Access-Control-Allow-Origin": "*"
      },
      body: formBody
    });
  }

  render() {
    return (
      <div className="header">
        <nav className="navbar navbar-expand-md navbar-dark bg-color flex-column">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src={Logo} alt="" style={{ width: 100 }} />
            </Link>
            <div class="search">
              <input type="text" onChange={this.handleOnChange} placeholder="Tìm kiếm" />
              <ul class="results my-2" >
                {this.state.listSP.map((value) => {
                  return  <Link className="navbar-brand" to={"/itemDetail/"+value.id}><li>
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
                  </Link>
                })}
              </ul>
            </div>
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item dropdown ml-4">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#abc"
                  id="dropdownId"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  Sản phẩm đã xem (2)
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
              <li className="nav-item dropdown ml-4">
                <a
                  className="nav-link text-white"
                  href="#abc"
                  id="user"
                  data-toggle="dropdown"
                  aria-haspopup="false"
                  aria-expanded="false"><i className="fas fa-user fa-2x text-white" />
                </a>
                <div className="dropdown-menu" aria-labelledby="user">
                  <a className="dropdown-item" data-toggle="modal" data-target="#login" href="#login">
                    Đăng nhập
                  </a>
                  <a className="dropdown-item" data-toggle="modal" data-target="#login" href="#login">
                    Đăng kí
                  </a>
                  <a className="dropdown-item" data-toggle="modal" data-target="#login" href="#login">
                    Quên mật khẩu
                  </a>
                </div>
              </li>
              <li className="nav-item ml-4">
                <a href="/cart">
                  <i className="fas fa-shopping-cart fa-2x text-white">
                    <small style={{ fontSize: 14 }}>(2)</small>
                  </i>
                </a>
              </li>
            </ul>
            {/* <!-- The Modal --> */}
            <div className="modal" id="login">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">

                  {/* <!-- Modal Header --> */}
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>

                  {/* <!-- Modal body --> */}
                  <div className="modal-body">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-sm-5">
                          <h2>Đăng nhập</h2>
                          <p>Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn.</p>
                          <img className="img-fluid" src="https://frontend.tikicdn.com/_new-next/static/img/graphic-map.png" alt="#alt"></img>
                        </div>
                        <div className="col-sm-7">
                          {/* <!-- Nav tabs --> */}
                          <ul className="nav nav-tabs">
                            <li className="nav-item active">
                              <a className="nav-link my-tab active" data-toggle="tab" href="#dangnhap">Đăng nhập</a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link my-tab" data-toggle="tab" href="#dangki">Đăng kí</a>
                            </li>
                          </ul>
                          {/* <!-- Tab panes --> */}
                          <div className="tab-content mt-4">
                            <div id="dangnhap" className="container tab-pane active">
                              <form onSubmit={this.onSubmitLogin}>
                                <div className="form-group row">
                                  <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                                  <div className="col-sm-9">
                                    <input type="text" className="form-control" name="username" placeholder="Nhập Email hoặc số điện thoại" onChange={this.onHandleChange} required />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Password</label>
                                  <div className="col-sm-9">
                                    <input type="password" className="form-control" name="password" placeholder="Mật khẩu từ 6 đến 32 kí tự" onChange={this.onHandleChange} required />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-9 offset-sm-3">
                                    Quên mật khẩu? Nhấn vào <a href="/">đây</a>
                                  </div>
                                </div>
                                <div className="row mt-4">
                                  <div className="col-sm-9 offset-sm-3">
                                    <button type="submit" className="btn btn-warning w-100">Đăng nhập</button>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <div id="dangki" className="container tab-pane fade">
                              <form>
                                <div className="form-group row">
                                  <label htmlFor="name" className="col-sm-3 col-form-label">Họ tên</label>
                                  <div className="col-sm-9">
                                    <input type="text" className="form-control" id="name" placeholder="Nhập họ tên" />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label htmlFor="phone" className="col-sm-3 col-form-label">SĐT</label>
                                  <div className="col-sm-9">
                                    <input type="text" className="form-control" id="phone" placeholder="Nhập số điện thoại" />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                                  <div className="col-sm-9">
                                    <input type="email" className="form-control" id="email" placeholder="Nhập email" />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label htmlFor="password" className="col-sm-3 col-form-label">Mật khẩu</label>
                                  <div className="col-sm-9">
                                    <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu từ 6 đến 32 kí tự" />
                                  </div>
                                </div>
                                <div className="row">
                                  <label className="col-sm-3 col-form-label">Giới tính</label>
                                  <div className='col-sm-9 my-auto'>
                                    <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                      <label className="form-check-label" htmlFor="inlineRadio1">Nam</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                      <label className="form-check-label" htmlFor="inlineRadio2">Nữ</label>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label htmlFor="example-date-input" className="col-sm-3 col-form-label">Ngày sinh</label>
                                  <div className="col-sm-9">
                                    <input className="form-control" type="date" id="example-date-input" />
                                  </div>
                                </div>
                                <div className="row mt-4">
                                  <div className="col-sm-9 offset-sm-3">
                                    <button className="btn btn-warning w-100">Tạo tài khoản</button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default header;