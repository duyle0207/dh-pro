import React, { Component } from 'react';
import { withRouter } from 'react-router';

class cpu extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isOpen: false,
            list: [],
            adminInfo: {},
            cpu: {
                tenCPU: "",
                tocDoCPU: '',
                congNgheCPU: "",
                boNhoDemCPU: "",
                tocDoTurbo: "",
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

        const totalPages = await (await fetch(`/getTotalPagesCPU`, {
            headers: {
                'Authorization': `Bearer ${adInfo.accessToken}`
            }
        })).json();
        this.setState({ totalPages: totalPages });
        const cpuList = await (await fetch(`/getCPU/page=${this.state.currentPage}`, {
            headers: {
                'Authorization': `Bearer ${adInfo.accessToken}`
            }
        })).json();
        this.setState({ list: cpuList });
    }

    async componentWillUpdate(nextProps, nextState) {
        if (nextState.currentPage !== this.state.currentPage) {
            const cardList = await (await fetch(`/getCPU/page=${nextState.currentPage}`, {
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
        if(!isTokenValid)
        {
            localStorage.removeItem("adminInfo");
            this.props.history.push('/loginAdmin?message=tokenexpired');
        }
        else{
            if (this.state.currentPage > 1) {
                this.setState({ currentPage: this.state.currentPage - 1 });
            }   
        }
    }

    async handleNextPage() {
        const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
        if(!isTokenValid)
        {
            localStorage.removeItem("adminInfo");
            this.props.history.push('/loginAdmin?message=tokenexpired');
        }
        else{
            if (this.state.currentPage < this.state.totalPages) {
                this.setState({ currentPage: this.state.currentPage + 1 });
            }   
        }
    }

    handleClick() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    handleChange(event) {
        var cpu = this.state.cpu;
        cpu[event.target.name] = event.target.value;
        this.setState({ cpu: cpu });
    }

    async insert(event) {
        event.preventDefault();

        const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
        if (!isTokenValid) {
            localStorage.removeItem("adminInfo");
            this.props.history.push('/loginAdmin?message=tokenexpired');
        }
        else {
            await fetch('/insertCPU', {
                method: (this.state.cpu.id === '') ? 'POST' : 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.adminInfo.accessToken}`
                },
                body: JSON.stringify(this.state.cpu),
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
            cpu: {
                tenCPU: "",
                tocDoCPU: '',
                congNgheCPU: "",
                boNhoDemCPU: "",
                tocDoTurbo: "",
                id: ""
            }
        });
    }

    async handleOnClickTable(id) {
        const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
        if(!isTokenValid)
        {
            localStorage.removeItem("adminInfo");
            this.props.history.push('/loginAdmin?message=tokenexpired');
        }
        else{
            const cpu = await (await fetch(`/cpu/${id}`, {
                headers: {
                    'Authorization': `Bearer ${this.state.adminInfo.accessToken}`
                }
            })).json();
            this.setState({ cpu: cpu });
            console.log(cpu);   
        }
    }

    handeClearBtn() {
        this.setState({
            cpu: {
                tenCPU: "",
                tocDoCPU: '',
                congNgheCPU: "",
                boNhoDemCPU: "",
                tocDoTurbo: "",
                id: ""
            }
        });
        // alert("im in");
    }

    async deleteCard(id) {
        // await fetch(`/deleteCard/${id}`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        // }).then((res) => {
        //     if (res.ok) {
        //         const newList = this.state.list.filter((value, index) => {
        //             return value.id !== id
        //         });
        //         this.setState({ list: newList });
        //         this.setState({ error: false, success: true });
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
                                <b>CPU</b>
                            </div>
                            <div className="col-sm-6">
                                <button type="button" class="btn btn-success" onClick={this.handleClick} style={{ float: "right" }}><i class="fas fa-sort-down"></i></button>
                            </div>
                        </div>
                    </div>
                    {this.state.isOpen ?
                        <div className="container-fluid">
                            <div className="row">

                            </div>
                            <div className="row">
                                <div className="col-sm-8">
                                    <div class="card-body bg-default">
                                        <table class="table table-hover">
                                            <thead class="thead-dark">
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Tên CPU</th>
                                                    <th scope="col">Tốc độ CPU</th>
                                                    <th scope="col">Công nghệ CPU</th>
                                                    <th scope="col">Bộ nhớ đệm</th>
                                                    <th scope="col">Tốc độ Turbo</th>
                                                    {/* <th scope="col"></th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.list.map((value, index) => {
                                                    return <tr onClick={() => this.handleOnClickTable(value.id)}>
                                                        <th scope="row">{value.id}</th>
                                                        <td>{value.tenCPU}</td>
                                                        <td style={{ width: "12%" }}>{value.tocDoCPU} GHz</td>
                                                        <td style={{ width: "20%" }}>
                                                            {value.congNgheCPU}</td>
                                                        <td style={{ width: "12%" }}>
                                                            {value.boNhoDemCPU}
                                                        </td>
                                                        <td style={{ width: "15%" }}>
                                                            {value.tocDoTurbo} GHz
                                                        </td>
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
                                    <h2>Thao tác: {this.state.cpu.id === '' ? <span class="badge badge-info">Thêm</span> : <span class="badge badge-warning">Chỉnh sữa</span>}</h2>
                                    <form onSubmit={this.insert}>
                                        <div className="form-group my-2 mx-2">
                                            <label><b>Tên CPU: </b></label>
                                            <input className="form-control" name="tenCPU" placeholder="Tên CPU" value={this.state.cpu.tenCPU} onChange={this.handleChange} required></input>
                                        </div>
                                        <div className="form-group my-2 mx-2">
                                            <label><b>Tốc độ CPU: </b></label>
                                            <input className="form-control" type="number" min="1" max="100" step="0.1" placeholder="Tốc độ CPU" name="tocDoCPU" value={this.state.cpu.tocDoCPU} onChange={this.handleChange} required></input>
                                        </div>
                                        <div className="form-group my-2 mx-2">
                                            <label><b>Công nghệ CPU: </b></label>
                                            <input className="form-control" type="text" placeholder="Công nghệ CPU" name="congNgheCPU" value={this.state.cpu.congNgheCPU} onChange={this.handleChange} required></input>
                                        </div>
                                        <div className="form-group my-2 mx-2">
                                            <label><b>Bộ nhớ đệm: </b></label>
                                            <input className="form-control" type="text" placeholder="Bộ nhớ đệm" name="boNhoDemCPU" value={this.state.cpu.boNhoDemCPU} onChange={this.handleChange} required></input>
                                        </div>
                                        <div className="form-group my-2 mx-2">
                                            <label><b>Tốc độ Turbo: </b></label>
                                            <input className="form-control" type="number" min="1" max="100" step="0.1" placeholder="Tốc độ Turbo" name="tocDoTurbo" value={this.state.cpu.tocDoTurbo} onChange={this.handleChange} required></input>
                                        </div>
                                        {this.state.error ?
                                            <div class="alert alert-danger" role="alert">
                                                <b>Lỗi</b>
                                            </div> : ""
                                        }
                                        {this.state.success ?
                                            <div class="alert alert-success" role="alert">
                                                <b>Thành công</b>
                                            </div> : ""
                                        }
                                        <button type="submit" class="btn btn-primary my-2 mx-2"><b>Lưu</b></button>
                                        {this.state.cpu.id === '' ? "" : <button type="button" onClick={this.handeClearBtn} class="btn btn-danger my-2 mx-2"><b>Chuyễn sang thao tác thêm</b></button>}
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

export default withRouter(cpu);