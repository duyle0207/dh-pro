import React, { Component } from 'react';
import { withRouter } from 'react-router';

class manHinh extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isOpen: false,
            list: [],
            adminInfo: {},
            manHinh: {
                kichThuoc: "",
                doPhanGiai: "",
                congNgheManHinh: "",
                manHinhCamUng: "",
                id: ""
            },
            getTotalPages: '',
            currentPage: 1,
            error: false,
            success: false
        });
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handeClearBtn = this.handeClearBtn.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.insert = this.insert.bind(this);
        this.clearField = this.clearField.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
    }

    async componentDidMount() {

        var adInfo = JSON.parse(localStorage.getItem("adminInfo"));

        this.setState({
            adminInfo: adInfo,
        }, () => {
            console.log(this.state.adminInfo);
        });

        const totalPages = await (await fetch(`/getTotalPages`, {
            headers: {
                'Authorization': `Bearer ${adInfo.accessToken}`
            }
        })).json();
        this.setState({ totalPages: totalPages });
        const cardList = await (await fetch(`/getManHinh/page=${this.state.currentPage}`, {
            headers: {
                'Authorization': `Bearer ${adInfo.accessToken}`
            }
        })).json();
        this.setState({ list: cardList });
    }

    handleClick() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    handleChange(event) {
        var manHinh = this.state.manHinh;
        manHinh[event.target.name] = event.target.value;
        this.setState({ manHinh: manHinh });
    }

    async insert(event) {
        event.preventDefault();
        const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
        if (!isTokenValid) {
            this.props.history.push('/loginAdmin?message=tokenexpired');
        }
        else {
            await fetch('/insertManHinh', {
                method: (this.state.manHinh.id === '') ? 'POST' : 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.adminInfo.accessToken}`
                },
                body: JSON.stringify(this.state.manHinh),
            }).then((res) => {
                if (res.ok) {
                    this.setState({ error: false, success: true });
                    this.clearField();
                    this.componentDidMount();
                }
                else {
                    this.setState({ error: true, success: false });
                }
            });
        }
    }

    clearField() {
        this.setState({
            manHinh: {
                kichThuoc: "",
                doPhanGiai: "",
                congNgheManHinh: "",
                manHinhCamUng: "",
                id: ""
            }
        });
    }

    async handleOnClickTable(id) {
        const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
        if (!isTokenValid) {
            this.props.history.push('/loginAdmin?message=tokenexpired');
        }
        else {
            const manHinh = await (await fetch(`/manHinh/${id}`, {
                headers: {
                    'Authorization': `Bearer ${this.state.adminInfo.accessToken}`
                }
            })).json();
            this.setState({ manHinh: manHinh });
            console.log(manHinh);
        }
    }

    async handeClearBtn() {
        this.setState({
            manHinh: {
                kichThuoc: "",
                doPhanGiai: "",
                congNgheManHinh: "",
                manHinhCamUng: "",
                id: ""
            }
        })
    }

    async componentWillUpdate(nextProps, nextState) {
        if (nextState.currentPage !== this.state.currentPage) {
            const manHinhList = await (await fetch(`/getManHinh/page=${nextState.currentPage}`, {
                headers: {
                    'Authorization': `Bearer ${this.state.adminInfo.accessToken}`
                }
            })).json();
            console.log(manHinhList);
            this.setState({ list: manHinhList });
        }
    }

    async handlePreviousPage() {
        const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
        if (!isTokenValid) {
            this.props.history.push('/loginAdmin?message=tokenexpired');
        }
        else {
            if (this.state.currentPage > 1) {
                this.setState({ currentPage: this.state.currentPage - 1 });
            }
        }
    }

    async handleNextPage() {
        const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
        if (!isTokenValid) {
            this.props.history.push('/loginAdmin?message=tokenexpired');
        }
        else {
            if (this.state.currentPage < this.state.totalPages) {
                this.setState({ currentPage: this.state.currentPage + 1 });
            }
        }
    }

    async deleteCard(id) {
        await fetch(`/deleteCard/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(async (res) => {
            if (res.ok) {
                const newList = this.state.list.filter((value, index) => {
                    return value.id !== id
                });
                this.setState({ list: newList });
                this.setState({ error: false, success: true });
                const totalPages = await (await fetch(`/getTotalPages`)).json();
                this.setState({ totalPages: totalPages });
            }
            else {
                this.setState({ error: true, success: false });
            }
        });
    }

    render() {
        return (
            <div className="col-sm-12">
                <div className="card text-white mb-3">
                    <div className="card-header bg-dark">
                        <div className="row">
                            <div className="col-sm-6">
                                <b>Màn hình</b>
                            </div>
                            <div className="col-sm-6">
                                <button type="button" class="btn btn-success" onClick={this.handleClick} style={{ float: "right" }}><i class="fas fa-sort-down"></i></button>
                            </div>
                        </div>
                    </div>
                    {this.state.isOpen ?
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-8">
                                    <div class="card-body bg-default">
                                        <table class="table table-hover">
                                            <thead class="thead-dark">
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Công nghệ màn hình</th>
                                                    <th scope="col">Độ phân giải</th>
                                                    <th scope="col">Kích thước</th>
                                                    <th scope="col">Cảm ứng</th>
                                                    {/* <th scope="col"></th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.list.map((value, index) => {
                                                    return <tr onClick={() => this.handleOnClickTable(value.id)}>
                                                        <th scope="row">{value.id}</th>
                                                        <td>{value.congNgheManHinh}</td>
                                                        <td style={{ width: "12%" }}>{value.doPhanGiai}</td>
                                                        <td style={{ width: "12%" }}>
                                                            {value.kichThuoc} inches
                                                        </td>
                                                        <td style={{ width: "12%" }}>
                                                            {value.manHinhCamUng ? <h3><span class="badge badge-success">Cảm ứng</span></h3> : <h3><span class="badge badge-info">Không Cảm ứng</span></h3>}
                                                        </td>
                                                        {/* <td style={{ width: "2%" }}>
                                                            <button type="button" class="btn btn-danger" onClick={() => this.deleteCard(value.id)} style={{ float: "right" }}><i class="fas fa-trash"></i></button>
                                                        </td> */}
                                                    </tr>
                                                })
                                                }
                                            </tbody>
                                        </table>
                                        <div className="row mx-4">
                                            <nav className="float-right" aria-label="Page navigation example">
                                                <ul class="pagination">
                                                    <li class="page-item"><a class="page-link" onClick={this.handlePreviousPage} href="#">Previous</a></li>
                                                    <li class="page-item"><a class="page-link" href="#">{this.state.currentPage}</a></li>
                                                    <li class="page-item"><a class="page-link" onClick={this.handleNextPage} href="#">Next</a></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4 text-dark my-4">
                                    <h2>Thao tác: {this.state.manHinh.id === '' ? <span class="badge badge-info">Thêm</span> : <span class="badge badge-warning">Chỉnh sữa</span>}</h2>
                                    <form onSubmit={this.insert}>
                                        <div className="form-group my-2 mx-2">
                                            <label><b>Công nghệ màn hình: </b></label>
                                            <input className="form-control" name="congNgheManHinh" placeholder="Công nghệ màn hình" value={this.state.manHinh.congNgheManHinh} onChange={this.handleChange} required></input>
                                        </div>
                                        <div className="form-group my-2 mx-2">
                                            <label><b>Độ phân giải: </b></label>
                                            <input className="form-control" type="text" placeholder="Độ phân giải" name="doPhanGiai" value={this.state.manHinh.doPhanGiai} onChange={this.handleChange} required></input>
                                        </div>
                                        <div className="form-group my-2 mx-2">
                                            <label><b>Kích thước: </b></label>
                                            <input className="form-control" type="number" step="0.1" min="1" max="50" placeholder="Kích thước" name="kichThuoc" value={this.state.manHinh.kichThuoc} onChange={this.handleChange} required></input>
                                        </div>
                                        <div className="form-group my-2 mx-2">
                                            <label><b>Cảm ứng</b></label>
                                            <select id="inputCPU" className="form-control" placeholder="kích thước" name="manHinhCamUng" value={this.state.manHinh.manHinhCamUng} onChange={this.handleChange} required>>
                                                <option value={true}>Cảm ứng</option>
                                                <option value={false}>Không cảm ứng</option>
                                            </select>
                                        </div>
                                        {this.state.error ?
                                            <div class="alert alert-danger mx-2" role="alert">
                                                <b>Lỗi</b>
                                            </div> : ""
                                        }
                                        {this.state.success ?
                                            <div class="alert alert-success mx-2" role="alert">
                                                <b>Thành công</b>
                                            </div> : ""
                                        }
                                        <button type="submit" class="btn btn-primary my-2 mx-2"><b>Lưu</b></button>
                                        {this.state.manHinh.id === '' ? "" : <button type="button" onClick={this.handeClearBtn} class="btn btn-danger my-2 mx-2"><b>Chuyễn sang thao tác thêm</b></button>}
                                    </form>
                                </div>
                            </div>
                        </div>
                        :
                        ""
                    }
                </div>
            </div >
        );
    }
}

export default withRouter(manHinh);