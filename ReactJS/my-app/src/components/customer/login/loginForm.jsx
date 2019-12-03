import React, { Component } from 'react';
import { withRouter } from 'react-router';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import '../../../css/facebookBtn.css';
import Modal from 'react-awesome-modal';

class loginForm extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            error: false,
            success: false,
            username: '',
            password: '',
            isLoggedIn: false,
            userID: "",
            name: "",
            email: "",
            picture: "",
            visible: false
        })

        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    componentDidMount() {
        const queryString = require('query-string');

        const params = queryString.parse(this.props.location.search);

        if (params.message === "tokenexpired") {
            this.setState({ visible: true });
        }
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
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

    async onSubmitLogin(event) {
        event.preventDefault();
        // alert("sss")
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
                if (data.authorities[0].authority === "Customer") {
                    localStorage.setItem("userInfo", JSON.stringify(data))
                    // this.setState({ userInfo: JSON.parse(localStorage.getItem("userInfo")) });
                    // console.log(this.state.userInfo);
                    this.props.history.push("/");
                    // this.props.history.goBack();
                }
                else {
                    this.setState({ error: true });
                }
            }
        });
    }

    responseFacebook = (response) => {
        console.log(response);
        console.log(response);
        fetch('/customerUnauthenticated/dangKySocialAccount', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: response.email + ".facebook",
                password: response.accessToken,
                email: response.email,
                role: {
                    "id": 2,
                    "tenRole": ""
                }
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data, typeof (data));
            if (data !== undefined) {
                localStorage.setItem("userInfo", JSON.stringify(data));
                if (data.newAccount === false) {
                    this.props.history.push("/");
                }
                else {
                    fetch('/customerUnauthenticated/themKhachHang', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            taiKhoan: {
                                id: data,
                                userName: "",
                                password: "",
                                email: null,
                                role: {}
                            },
                            ten: response.name,
                            diaChi: "",
                            email: response.email,
                            soDT: "",
                            ngaySinh: "",
                            gioiTinh: "",
                        })
                    }).then(res => {
                        if (res.ok) {
                            this.props.history.push("/");
                        }
                    });
                }
            }
        }).catch(err => {
            console.log("Error");
            console.log(err);
        });
    }

    responseGoogle = (response) => {
        console.log(response);
        console.log(response.w3.U3);
        console.log(response.accessToken);
        fetch('/customerUnauthenticated/dangKySocialAccount', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: response.w3.U3 + ".google",
                password: response.accessToken,
                email: response.w3.U3,
                role: {
                    "id": 2,
                    "tenRole": ""
                }
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data, typeof (data));
            if (data !== undefined) {
                localStorage.setItem("userInfo", JSON.stringify(data));
                if (data.newAccount === false) {
                    this.props.history.push("/");
                }
                else {
                    // var usInfo = JSON.parse(localStorage.setItem("userInfo", JSON.stringify(data)));
                    // usInfo['customerName'] = response.w3.ig;
                    // localStorage.setItem("userInfo", JSON.stringify(usInfo));
                    fetch('/customerUnauthenticated/themKhachHang', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            taiKhoan: {
                                id: data.id,
                                userName: "",
                                password: "",
                                email: null,
                                role: {}
                            },
                            ten: response.w3.ig,
                            diaChi: "",
                            email: response.w3.U3,
                            soDT: "",
                            ngaySinh: "",
                            gioiTinh: ""
                        })
                    }).then(res => {
                        if (res.ok) {
                            var usInfo = JSON.parse(localStorage.getItem("userInfo"));
                            usInfo['customerName'] = response.w3.ig;
                            localStorage.setItem("userInfo", JSON.stringify(usInfo));
                            this.props.history.push("/");
                        }
                    })
                }
            }
        }).catch(err => {
            console.log("Error");
            console.log(err);
        });
    }


    render() {
        // let fbContent;
        // if (this.state.isLoggedIn) {
        //     fbContent = (
        //         <div
        //             style={{
        //                 width: "400px",
        //                 margin: "auto",
        //                 background: "#f4f4f4",
        //                 padding: "20px"
        //             }}
        //         >
        //             <img src={this.state.picture} alt={this.state.name} />
        //             <h2>Welcome {this.state.name}</h2>
        //             Email: {this.state.email}
        //         </div>
        //     );
        // } else {
        // }

        return (
            <div className="container">
                <Modal visible={this.state.visible} width="400" height="200" effect="fadeInDown" onClickAway={() => this.closeModal()}>
                    <div className="text-center">
                        <div className="" >
                            <div className="toast-header">
                                <strong className="mr-auto">Thông báo</strong>
                                {/* <small>11 mins ago</small> */}
                                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                    {/* <span aria-hidden="true" ></span> */}
                                    <a className="text-decoration-none text-dark" href="javascript:void(0);" onClick={() => this.closeModal()}>&times;</a>
                                </button>
                            </div>
                            <div className="toast-body">
                                <div className="row mt-4">
                                    <div className="col-sm-3">
                                        <i className="ml-4 fa fa-remove" style={{ color: '#FE2020', 'fontSize': '60px' }}></i>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="h5 mx-3 mb-4 text-justify">Phiên đăng nhập của bạn đã hết vui lòng đăng nhập lại để tiếp tục</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <h1><span className="badge badge-warning my-4">Thông báo</span></h1> */}

                    </div>
                </Modal>
                <div className="row my-4">
                    <div className="col-sm-5">
                        <h2>Đăng nhập</h2>
                        <p>Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn.</p>
                        <img className="img-fluid" src="https://frontend.tikicdn.com/_new-next/static/img/graphic-map.png" alt="#alt"></img>
                    </div>
                    <div className="col-sm-7">
                        {/* <!-- Nav tabs --> */}
                        {/* <!-- Tab panes --> */}
                        <div className="tab-content mt-4">
                            <div id="dangnhap" className="container tab-pane active">
                                <form onSubmit={this.onSubmitLogin}>
                                    <div className="form-group row">
                                        <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Tên đăng nhập</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="username" placeholder="Nhập tên đăng nhập" onChange={this.onHandleChange} required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Password</label>
                                        <div className="col-sm-9">
                                            <input type="password" className="form-control" name="password" placeholder="Mật khẩu từ 6 đến 32 kí tự" onChange={this.onHandleChange} required />
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-sm-9 offset-sm-3">
                                            {this.state.error ? <div class="alert alert-danger text-center" role="alert">
                                                <b>Login failed</b>
                                            </div> : ""}
                                            <button type="submit" className="btn btn-warning w-100"><b>Đăng nhập</b></button>
                                            <div className="row mt-2">
                                                <div className="col-sm-6">
                                                    <FacebookLogin
                                                        appId="652851902151426" //APP ID NOT CREATED YET
                                                        fields="name,email,picture"
                                                        textButton="Facebook"
                                                        size="small"
                                                        icon={<i className="fab fa-facebook-f icon ml-3 mt-1"></i>}
                                                        version="2.3"
                                                        cssClass="btnFacebook"
                                                        callback={this.responseFacebook}
                                                    // autoLoad={true}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <GoogleLogin
                                                        clientId="191659603798-o1h3pffa90vi6dkmufi1btf3t05vk8r7.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                                                        // scope="profile,email"
                                                        className="btnGoogle"
                                                        buttonText="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Google"
                                                        icon={true}
                                                        onSuccess={this.responseGoogle}
                                                        onFailure={this.responseGoogle}
                                                    // autoLoad={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(loginForm);