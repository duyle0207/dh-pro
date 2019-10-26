import React, { Component } from 'react';


// var account = [{"username":"thang1","password":"duyle","role":2},
//                 {"username":"thang2","password":"duyle","role":2}];
class login extends Component {
    constructor(props)
    {
        super(props);
        this.state = ({
            user: {},
            value : ''
        });
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    async componentDidMount()
    {
        const link = '/api/account/'+ this.props.match.params.id;
        console.log(this.props.match.params.id);
        const acc = await (await fetch(link)).json();
        this.setState({
            user: acc
        });
    }

    handleChange(event) {
        let name = event.target.name;
        let acc = this.state.user;
        acc[name] = event.target.value;
        this.setState({acc});
    }

    async login()
    {
        await fetch('/api/testPOST',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },  
            body : JSON.stringify(this.state.user)
        });
        this.props.history.push('/');
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
                                        <input type="text" name="username" value={this.state.user.username || ''} onChange={this.handleChange} id="inputEmail" className="form-control" placeholder="Email address" required="required" autoFocus="autofocus" ref="username"/>
                                        <label htmlFor="inputEmail">Email address</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-label-group">
                                        <input type="text" name="password" id="inputPassword" className="form-control" onChange={this.handleChange} placeholder="Password" required="required" ref="password"
                                        value={this.state.user.password || ''}/>
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-label-group">
                                        <input type="text" name="role" id="inputRole" className="form-control" onChange={this.handleChange} placeholder="Password" required="required" ref="role"
                                        value={this.state.user.role || ''}/>
                                        <label htmlFor="inputRole">Role</label>
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