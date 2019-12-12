import React, { Component } from 'react';
import { withRouter } from 'react-router';

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            phone: '',
            address: '',
            date: '',
            name: '',
            gender: '',
            rePassword: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeRePassword = this.handleChangeRePassword.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleChange(event) {
        var name = event.target.name;
        if (name === "username") {
            this.setState({ username: event.target.value });
        }
        else if (name === "password") {
            this.setState({ password: event.target.value });
        }
        else if (name === "name") {
            this.setState({ name: event.target.value });
        }
        else if (name === "phone") {
            this.setState({ phone: event.target.value });
        }
        else if (name === "email") {
            this.setState({ email: event.target.value });
        }
        else if (name === "address") {
            this.setState({ address: event.target.value });
        }
        else if (name === "date") {
            this.setState({ date: event.target.value });
        }
    }

    handleChangeRePassword(event) {
        console.log(event.target.value);
        this.setState({ rePassword: event.target.value });
    }

    handleOptionChange(changeEvent) {
        this.setState({
            gender: changeEvent.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.password !== this.state.rePassword) {
            alert("Mật khẫu không khớp");
        }
        else {
            fetch('/customerUnauthenticated/dangKi', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
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
                    return res.json();
                } else {
                    alert("Có lỗi xảy ra");
                }
            }).then(data => {
                console.log(data, typeof (data));
                if (typeof (data) === "number") {
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
                            ten: this.state.name,
                            diaChi: this.state.address,
                            email: this.state.email,
                            soDT: this.state.phone,
                            ngaySinh: this.state.date,
                            gioiTinh: this.state.gender
                        })
                    }).then(res => {
                        if (res.ok) {
                            this.props.history.push("/login");
                        }
                    })
                }
            }).catch(err => {
                console.log("Error");
                console.log(err);
            });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row my-4">
                    <div className="col-6">
                        <h2>Tạo tài khoản</h2>
                        <p>Tạo tài khoản để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn.</p>
                        <img className="img-fluid" src="https://frontend.tikicdn.com/_new-next/static/img/graphic-map.png" alt="#alt"></img>
                    </div>
                    <form className="col-6" onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Họ tên</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="name"
                                    pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"
                                    title="Vui lòng nhập tên hợp lệ"
                                    placeholder="Nhập họ tên" required
                                    value={this.state.name} onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Địa chỉ</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="address" placeholder="Nhập địa chỉ" required
                                    value={this.state.address} onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Email</label>
                            <div className="col-sm-9">
                                <input type="email" className="form-control" name="email" placeholder="Nhập email"
                                    pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
                                    required title="Hãy nhập đúng định dạng Email"
                                    value={this.state.email} onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">SĐT</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control"
                                    pattern="(09|01[2|6|8|9])+([0-9]{8})\b" title="Hãy nhập đúng định dạng số điện thoại"
                                    name="phone" placeholder="Nhập số điện thoại" required
                                    value={this.state.phone} onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Tên đăng nhập</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control"
                                 pattern="^[a-z0-9_-]{8,16}$"
                                 title="Vui lòng sử dụng tên đăng nhập hợp lệ"
                                 placeholder="Nhập tên đăng nhập" name="username" required
                                 value={this.state.userName} onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Mật khẩu</label>
                            <div className="col-sm-9">
                                <input type="password" className="form-control"
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$"
                                    placeholder="Mật khẫu"
                                    title="Nhập mật khẩu từ 8 đến 10 kí tự, ít nhất một chữ viết hoa và 1 ký tự đặc biệt" name="password" required
                                    value={this.state.password} onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Nhập lại</label>
                            <div className="col-sm-9">
                                <input type="password" className="form-control" placeholder="Nhập mật khẩu từ 6 đến 32 kí tự" name="password" required
                                    value={this.state.rePassword} onChange={this.handleChangeRePassword}
                                />
                            </div>
                        </div>
                        {/* <div className="row">
                            <label className="col-sm-3 col-form-label">Giới tính</label>
                            <div className='col-sm-9 my-auto'>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" value="Nam"
                                        checked={this.state.gender === 'Nam'}
                                        onChange={this.handleOptionChange}
                                    />
                                    <label className="form-check-label">Nam</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" value="Nữ"
                                        checked={this.state.gender === 'Nữ'}
                                        onChange={this.handleOptionChange}
                                    />
                                    <label className="form-check-label">Nữ</label>
                                </div>
                            </div>
                        </div> */}
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Ngày sinh</label>
                            <div className="col-sm-9">
                                <input className="form-control" type="date" name="date" value={this.state.date} onChange={this.handleChange} required />
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
        );
    }
}

export default withRouter(RegisterForm);