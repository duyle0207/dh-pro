import React, { Component } from 'react';
import { withRouter } from 'react-router';

class pin extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isOpen: false,
            list: [],
            adminInfo: {},
            pin: {
                id: "",
                thongTinPin: "",
                thoiGianSuDung: "",
                boSac: ""
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
        this.insertCardDoHoa = this.insertCardDoHoa.bind(this);
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

        const totalPages = await (await fetch(`/getTotalPagesPin`, {
            headers: {
                'Authorization': `Bearer ${adInfo.accessToken}`
            }
        })).json();
        this.setState({ totalPages: totalPages });
        const cardList = await (await fetch(`/getPin/page=${this.state.currentPage}`, {
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
        var pin = this.state.pin;
        pin[event.target.name] = event.target.value;
        this.setState({ pin: pin });
    }

    async insertCardDoHoa(event) {
        event.preventDefault();
        console.log(JSON.stringify(this.state.pin));
        const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
        if (!isTokenValid) {
            localStorage.removeItem("adminInfo");
            this.props.history.push('/loginAdmin?message=tokenexpired');
        }
        else {
            await fetch('/insertPin', {
                method: (this.state.pin.id === '') ? 'POST' : 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.adminInfo.accessToken}`
                },
                body: JSON.stringify(this.state.pin),
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
            pin: {
                id: "",
                thongTinPin: "",
                thoiGianSuDung: "",
                boSac: ""
            }
        });
    }

    async handleOnClickTable(id) {
        const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
        if (!isTokenValid) {
            localStorage.removeItem("adminInfo");
            this.props.history.push('/loginAdmin?message=tokenexpired');
        }
        else {
            const pin = await (await fetch(`/hung/pin/${id}`, {
                headers: {
                    'Authorization': `Bearer ${this.state.adminInfo.accessToken}`
                }
            })).json();
            this.setState({ pin: pin });
        }
    }

    async handeClearBtn() {
        this.setState({
            pin: {
                id: "",
                thongTinPin: "",
                thoiGianSuDung: "",
                boSac: ""
            }
        })
    }

    async componentWillUpdate(nextProps, nextState) {
        if (nextState.currentPage !== this.state.currentPage) {
            const cardList = await (await fetch(`/getPin/page=${nextState.currentPage}`, {
                headers: {
                    'Authorization': `Bearer ${this.state.adminInfo.accessToken}`
                }
            })).json();
            console.log(cardList);
            this.setState({ list: cardList });
        }
    }

    async handlePreviousPage() {
        const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
        if (!isTokenValid) {
            localStorage.removeItem("adminInfo");
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
            localStorage.removeItem("adminInfo");
            this.props.history.push('/loginAdmin?message=tokenexpired');
        }
        else {
            if (this.state.currentPage < this.state.totalPages) {
                this.setState({ currentPage: this.state.currentPage + 1 });
            }
        }
    }

    async deleteCard(id) {
        // await fetch(`/deleteCard/${id}`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        // }).then(async(res) => {
        //     if (res.ok) {
        //         const newList = this.state.list.filter((value, index) => {
        //             return value.id !== id
        //         });
        //         this.setState({ list: newList });
        //         this.setState({ error: false, success: true });
        //         const totalPages = await(await fetch(`/getTotalPages`)).json();
        //         this.setState({ totalPages: totalPages });
        //     }
        //     else {
        //         this.setState({ error: true, success: false });
        //     }
        // });
    }

    render() {
        return (
            <div className="col-sm-12">
                <div className="card text-white mb-3">
                    <div className="card-header bg-dark">
                        <div className="row">
                            <div className="col-sm-6">
                                <b>Pin</b>
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
                                                    <th scope="col">Thông tin pin</th>
                                                    <th scope="col">Thời gian sử dụng</th>
                                                    <th scope="col">Bộ sạc</th>
                                                    {/* <th scope="col"></th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.list.map((value, index) => {
                                                    return <tr onClick={() => this.handleOnClickTable(value.id)}>
                                                        <th scope="row">{value.id}</th>
                                                        <td>{value.thongTinPin}</td>
                                                        <td style={{ width: "20%" }}>{value.thoiGianSuDung} giờ</td>
                                                        <td style={{ width: "20%" }}>
                                                            {value.boSac}</td>
                                                        {/* <td style={{ width: "2%" }}>
                                                            <button type="button" class="btn btn-danger" onClick={() => this.deleteCard(value.id)} style={{ float: "right" }}><i class="fas fa-trash"></i></button>
                                                        </td> */}
                                                    </tr>
                                                })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-sm-4 text-dark my-4">
                                    <h2>Thao tác: {this.state.pin.id === '' ? <span class="badge badge-info">Thêm</span> : <span class="badge badge-warning">Chỉnh sửa</span>}</h2>
                                    <form onSubmit={this.insertCardDoHoa}>
                                        <div className="form-group my-2 mx-2">
                                            <label><b>Thông tin pin: </b></label>
                                            <input className="form-control" name="thongTinPin" placeholder="Tên card đồ họa" value={this.state.pin.thongTinPin} onChange={this.handleChange} required></input>
                                        </div>
                                        <div className="form-group my-2 mx-2">
                                            <label><b>Thời gian sử dụng: </b></label>
                                            <input className="form-control" type="number" min="1" max="64" placeholder="Bộ nhớ" name="thoiGianSuDung" value={this.state.pin.thoiGianSuDung} onChange={this.handleChange} required></input>
                                        </div>
                                        <div className="form-group my-2 mx-2">
                                            <label><b>Bộ sạc: </b></label>
                                            <input className="form-control" type="text" placeholder="Bộ nhớ" name="boSac" value={this.state.pin.boSac} onChange={this.handleChange} required></input>
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
                                        {this.state.pin.id === '' ? "" : <button type="button" onClick={this.handeClearBtn} class="btn btn-danger my-2 mx-2"><b>Hủy</b></button>}
                                    </form>
                                </div>
                            </div>
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
                        :
                        ""
                    }
                </div>
            </div >
        );
    }
}

export default withRouter(pin);