import React, { Component } from 'react';

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '', password: '', email: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        var name = event.target.name;
        if (name === "username") {
            this.setState({ username: event.target.value });
        }
        else if (name === "password") {
            this.setState({ password: event.target.value });
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        // alert("sss")
        fetch('/customerUnauthenticated/dangKi', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            body: JSON.stringify({
                userName: this.state.username,
                password: this.state.password,
                email: null,
                role: {
                    "id": 2,
                    "tenRole": ""
                }
            })
        }).then(res => {
            console.log(res)
            if (res.status === 409) {
                alert("Tên đăng nhập đã có người sử dụng");
            }
            else if (res.ok) {
                alert("ĐK thành công");
            } else {
                alert("Có lỗi xảy ra");
                console.log(res);
            }
        }).catch(err => {
            console.log("Error");
            console.log(err);
        });
    }

    render() {
        return (
            <form className="col-6 offset-5" onSubmit={this.handleSubmit}>
                {/* <div className="form-group row">
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
                </div> */}
                <div className="form-group row">
                    <label htmlFor="email" className="col-sm-3 col-form-label">Tên đăng nhập</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" placeholder="Nhập tên đăng nhập" name="username"
                            value={this.state.userName} onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-3 col-form-label">Mật khẩu</label>
                    <div className="col-sm-9">
                        <input type="password" className="form-control" placeholder="Nhập mật khẩu từ 6 đến 32 kí tự" name="password"
                            value={this.state.password} onChange={this.handleChange}
                        />
                    </div>
                </div>
                {/* <div className="row">
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
                </div> */}
                <div className="row mt-4">
                    <div className="col-sm-9 offset-sm-3">
                        <button className="btn btn-warning w-100">Tạo tài khoản</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default RegisterForm;