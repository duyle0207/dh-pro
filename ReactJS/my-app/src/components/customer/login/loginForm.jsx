import React, { Component } from 'react';
import { withRouter  } from 'react-router';

class loginForm extends Component {

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
                if(data.authorities[0].authority==="Customer")
                {
                    localStorage.setItem("userInfo", JSON.stringify(data))
                    this.setState({ userInfo: JSON.parse(localStorage.getItem("userInfo")) });
                    console.log(this.state.userInfo);
                    // this.props.history.push("/");
                    this.props.history.goBack();
                }
                else{
                    this.setState({error:true});
                }
            }
        });
    }


    render() {
        return (
            <div className="container" style={{ marginBottom: "100px", marginTop: "100px" }}>
                <div className="row">
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
                                    <div className="row mt-4">
                                        <div className="col-sm-9 offset-sm-3">
                                            {this.state.error ? <div class="alert alert-danger text-center" role="alert">
                                                                <b>Login failed</b>
                                                            </div> : ""}
                                            <button type="submit" className="btn btn-warning w-100"><b>Đăng nhập</b></button>
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