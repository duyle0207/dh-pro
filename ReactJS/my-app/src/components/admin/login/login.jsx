import React, { Component } from 'react';
import logo from '../../../images/logo.png';
import { withRouter, Redirect } from 'react-router';
import AuthContext from '../../router/Auth';
import Modal from 'react-awesome-modal';


class login extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            error: false,
            success: false,
            username: '',
            password: '',
            visible: false
        })

        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

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
                console.log("error");
                this.setState({ error: true });
            }
        }).then((data) => {
            // console.log(data !== undefined);
            if (data !== undefined) {
                if (data.authorities[0].authority === "Admin") {
                    localStorage.setItem("adminInfo", JSON.stringify(data))
                    console.log("Login Component");
                    this.setState({ success: true });
                }
                else {
                    this.setState({ error: true });
                }
            }
        });
    }

    redirectToAdminPage() {
        // this.props.history.push("/admin");
    }

    asyncLocalStorage = {
        setItem: function (key, value) {
            return Promise.resolve().then(function () {
                localStorage.setItem(key, value);
            });
        },
        getItem: function (key) {
            return Promise.resolve().then(function () {
                return localStorage.getItem(key);
            });
        }
    };


    render() {

        if (this.state.success) {
            return <Redirect to='/admin' />
        }

        return (
            <React.Fragment>
                <div className="container" style={{ marginTop: '200px' }}>
                    <div className="row mx-4 my-4">
                        <h1>Chào mừng đến với DHPro</h1>
                        {/* <AuthContext.Consumer>

                        </AuthContext.Consumer> */}
                    </div>
                    <div class="card">
                        <div className="row mx-3 my-3">
                            <div className="col-sm-5">
                                <img src={logo} class="img-fluid bg-dark mt-4" alt="..."></img>
                            </div>
                            <div className="col-sm-7">
                                <form onSubmit={this.onSubmitLogin}>
                                    <div className="form-group mx-4 my-4">
                                        <label for="exampleInputEmail1">Tài khoản</label>
                                        <input type="text" className="form-control" name="username" placeholder="Tài khoản" onChange={this.onHandleChange} required></input>
                                    </div>
                                    <div className="form-group mx-4 my-4">
                                        <label for="exampleInputPassword1">Mật khẫu</label>
                                        <input type="password" className="form-control" name="password" placeholder="Mật khẫu" onChange={this.onHandleChange} required></input>
                                    </div>
                                    <div className="form-group mx-4 my-4">
                                        {this.state.error ? <div class="alert alert-danger text-center" role="alert">
                                            <b>Login failed</b>
                                        </div> : ""}
                                        <button type="submit mx-4 my-4" className="btn btn-success"><b>Đăng nhập</b></button>
                                    </div>
                                </form>
                            </div>
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
                                                    <i className="ml-4 fa fa-remove" style={{color:'#FE2020','fontSize':'60px'}}></i>
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
                        </div>

                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(login);