import React, { Component } from 'react';
import logo from '../../../images/logo.png';
import { withRouter  } from 'react-router';

class login extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            error: false,
            success: false,
            username: '',
            password: ''
        })

        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
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
                if (data.authorities[0].authority === "Admin") {
                    // alert("Success");
                    localStorage.setItem("adminInfo", JSON.stringify(data))
                    this.setState({ userInfo: JSON.parse(localStorage.getItem("adminInfo"))},()=>{
                        this.props.history.push("/admin");
                    });
                    // console.log(this.state.userInfo);
                }
                else
                {
                    this.setState({ error: true });
                }
            }
        });
    }


    render() {
        return (
            <React.Fragment>
                <div className="container" style={{ marginTop: '200px' }}>
                    <div className="row mx-4 my-4">
                        <h1>Chào mừng đến với DHPro</h1>
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
                        </div>

                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(login);