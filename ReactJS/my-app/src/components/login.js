import React, { Component } from 'react';


class login extends Component {
    constructor(props)
    {
        super(props);
        this.login = this.login.bind(this);
    }
    async login()
    {
        await fetch('/j_spring_security_check',{
            method: 'POST',
            body :{
                username: this.refs.username.value,
                password: this.refs.password.value
            }
        }).then(()=>{
            console.log("Success");
        })
        .catch(e => console.warn(e));
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="card card-login mx-auto mt-5">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <div className="form-label-group">
                                        <input type="text" id="inputEmail" className="form-control" placeholder="Email address" required="required" autofocus="autofocus" ref="username"/>
                                        <label htmlFor="inputEmail">Email address</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-label-group">
                                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="required" ref="password"/>
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" defaultValue="remember-me" />
                                            Remember Password
                                        </label>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-block" onClick={this.login}>Login</button>
                            </form>
                            <div className="text-center">
                                <a className="d-block small mt-3" href="register.html">Register an Account</a>
                                <a className="d-block small" href="forgot-password.html">Forgot Password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default login;