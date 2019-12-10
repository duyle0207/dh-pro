import React, { Component } from 'react';
import { withRouter } from 'react-router';

class profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            isChangePassword: false,
            oldPassword: '',
            isOldPasswordTrue: true,
            customer: {},
            isUpdateSuccess: false,
            isUpdateFail: false,
            newPassword: "",
            confirmNewPassword: ""
        };

        //Ref
        // this.genderNam = React.createRef();
        // this.genderNu = React.createRef();
        //Func
        this.onHandleChangeRatio = this.onHandleChangeRatio.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleChangeGender = this.onHandleChangeGender.bind(this);
        this.onHandleClickSave = this.onHandleClickSave.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.onHandleNewPassword = this.onHandleNewPassword.bind(this);
        this.onHandleConfirmPassword = this.onHandleConfirmPassword.bind(this);
    }

    async componentDidMount() {
        const customer = await (await fetch(`/customerUnauthenticated/getCustomerByUsername/${JSON.parse(localStorage.getItem("userInfo")).userName}`)).json();
        this.setState({
            customer: customer,
        });

        // this.state.customer.gioiTinh === "Nam" ? (this.genderNam.current.checked = true) : (this.genderNu.current.checked = true);
    }

    onHandleChangeRatio(event) {
        this.setState({ isChangePassword: event.target.checked });
    }

    onHandleChange(event) {
        var cus = this.state.customer;
        cus[event.target.name] = event.target.value;
        this.setState({ customer: cus });
    }

    onHandleChangeGender() {
        var cus = this.state.customer;
        this.genderNam.current.checked ? cus["gioiTinh"] = "Nam" : cus["gioiTinh"] = "Nữ"
        this.setState({ customer: cus });
    }

    async onHandleClickSave(event) {
        event.preventDefault();

        const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("userInfo")).accessToken}`)).json();
        if (!isTokenValid) {
            await fetch(`/customerUnauthenticated/logout`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            localStorage.removeItem("userInfo");
            this.props.history.push('/login?message=tokenexpired');
        }
        else {
            var cusInfo = JSON.parse(localStorage.getItem("userInfo"));

            if (this.state.isChangePassword) {
                const comparePassword = await (await fetch(`/comparePassword/${this.state.customer.taiKhoan.userName}/${this.state.oldPassword}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cusInfo.accessToken}`
                    }
                })).json();

                if (!comparePassword) {
                    this.setState({ isOldPasswordTrue: false });
                }
                else {
                    if (this.state.newPassword !== this.state.confirmNewPassword) {
                        alert("Mật khẫu không khớp");
                    }
                    else {
                        const cus = this.state.customer;
                        cus["taiKhoan"]["password"] = this.state.newPassword;

                        this.setState({ customer: cus });

                        await fetch(`/updateKH`, {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${cusInfo.accessToken}`
                            },
                            body: JSON.stringify(this.state.customer)
                        }).then(res => {
                            if (res.ok) {
                                this.setState({ isUpdateSuccess: true, isUpdateFail: false });
                            }
                            else {
                                this.setState({ isUpdateFail: true, isUpdateSuccess: false });
                            }
                        });
                    }
                }
            }
            else {
                await fetch(`/updateKH`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cusInfo.accessToken}`
                    },
                    body: JSON.stringify(this.state.customer)
                }).then(res => {
                    if (res.ok) {
                        this.setState({ isUpdateSuccess: true, isUpdateFail: false });
                    }
                    else {
                        this.setState({ isUpdateFail: true, isUpdateSuccess: false });
                    }
                });
            }
        }
    }

    handleChangePassword(event) {
        this.setState({ oldPassword: event.target.value });
    }

    onHandleConfirmPassword(event) {
        this.setState({ confirmNewPassword: event.target.value });
    }

    onHandleNewPassword(event) {
        this.setState({ newPassword: event.target.value });
    }

    render() {
        return (
            <div style={{ marginBottom: 200 }}>
                <nav className="navbar navbar-light bg-light mb-3">
                    <span className="navbar-brand mb-0 h1">
                        Đơn hàng của tôi
                    </span>
                </nav>
                {this.state.isUpdateSuccess ?
                    <div className="alert alert-success" role="alert">
                        <i className="fas fa-check"></i><b>  Chỉnh sữa thành công</b>
                    </div>
                    :
                    ""
                }
                {this.state.isUpdateFail ?
                    <div className="alert alert-danger" role="alert">
                        <i className="fas fa-times"></i><b>  Chỉnh sữa thất bại</b>
                    </div>
                    :
                    ""
                }
                <form onSubmit={this.onHandleClickSave}>
                    <div className="row my-4">
                        <div className="col-sm-3">
                            <p className="mt-2 mx-2">Họ tên:</p>
                        </div>
                        <div className="col-sm-9">
                            <input type="text" className="form-control w-75" width="40px" name="ten" value={this.state.customer.ten} placeholder="Tên" onChange={this.onHandleChange} required />
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col-sm-3">
                            <p className="mt-2 mx-2">Địa chỉ:</p>
                        </div>
                        <div className="col-sm-9">
                            <input type="text" className="form-control w-75" width="40px" value={this.state.customer.diaChi} name="diaChi" placeholder="Địa chỉ" onChange={this.onHandleChange} required />
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col-sm-3">
                            <p className="mt-2 mx-2">Email:</p>
                        </div>
                        <div className="col-sm-9">
                            <input type="email" className="form-control w-75" pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$" title="Hãy nhập đúng định dạng Email"
                             width="40px" value={this.state.customer.email} name="email" placeholder="Email" onChange={this.onHandleChange} disabled required />
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col-sm-3">
                            <p className="mt-2 mx-2">Số điện thoại:</p>
                        </div>
                        <div className="col-sm-9">
                            <input type="text" className="form-control w-75" width="40px" name="soDT"
                             pattern="(09|01[2|6|8|9])+([0-9]{8})\b" title="Hãy nhập đúng định dạng số điện thoại" 
                             value={this.state.customer.soDT}
                             placeholder="Số điện thoại" onChange={this.onHandleChange} required />
                        </div>
                    </div>
                    {/* <div className="row my-4">
                        <div className="col-sm-3">
                            <p className="mt-2 mx-2">Giới tính:</p>
                        </div>
                        <div className="col-sm-9">
                            <div className="custom-control custom-radio my-1">
                                <input type="radio" id="customRadio1" className="customRadio" className="custom-control-input" onChange={this.onHandleChangeGender} ref={this.genderNam} />
                                <label className="custom-control-label" htmlFor="customRadio1">Nam</label>
                            </div>
                            <div className="custom-control custom-radio my-1">
                                <input type="radio" id="customRadio2" className="customRadio" className="custom-control-input" onChange={this.onHandleChangeGender} ref={this.genderNu} />
                                <label className="custom-control-label" htmlFor="customRadio2">Nữ</label>
                            </div>
                        </div>
                    </div> */}
                    <div className="row my-4">
                        <div className="col-sm-3">
                            {/* <p className="mt-2 mx-2">Ngày sinh:</p> */}
                        </div>
                        <div className="col-sm-9">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" onChange={this.onHandleChangeRatio} />
                                <label className="custom-control-label" htmlFor="customCheck1">Thay đổi mật khẫu</label>
                            </div>
                        </div>
                    </div>
                    {this.state.isChangePassword ?
                        <div>
                            <div className="row my-4">
                                <div className="col-sm-3">
                                    <p className="mt-2 mx-2">Mật khẫu cũ:</p>
                                </div>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control w-75" width="40px" name="password" placeholder="Mật khẫu cũ" onChange={this.handleChangePassword} value={this.state.oldPassword} required />
                                    {!this.state.isOldPasswordTrue ?
                                        <p className="text-danger">Mật khẫu cũ không hợp lệ</p>
                                        :
                                        ""
                                    }

                                </div>
                            </div>
                            <div className="row my-4">
                                <div className="col-sm-3">
                                    <p className="mt-2 mx-2">Mật khẫu mới:</p>
                                </div>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control w-75" width="40px" value={this.state.newPassword} name="username" placeholder="Mật khẫu mới" onChange={this.onHandleNewPassword} required />
                                </div>
                            </div>
                            <div className="row my-4">
                                <div className="col-sm-3">
                                    <p className="mt-2 mx-2">Nhập lại:</p>
                                </div>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control w-75" width="40px" value={this.state.confirmNewPassword} name="username" placeholder="Nhập lại" onChange={this.onHandleConfirmPassword} required />
                                </div>
                            </div>
                        </div>
                        :
                        ""
                    }
                    <div className="row my-4">
                        <div className="col-sm-3">
                            {/* <p className="mt-2 mx-2"></p> */}
                        </div>
                        <div className="col-sm-9">
                            <button className="btn btn-warning" style={{ width: '200px', height: '50px' }}>Cập nhật</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(profile);