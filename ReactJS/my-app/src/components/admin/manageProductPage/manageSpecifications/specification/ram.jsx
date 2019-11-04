import React, { Component } from 'react';

class ram extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isOpen: false,
            list: [],
            ram: {
                boNhoRAM: '',
                loaiRAM: '',
                tocDoBus: '',
                id: ''
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
        const totalPages = await (await fetch(`/getTotalPagesRAM`)).json();
        this.setState({ totalPages: totalPages });
        const cardList = await (await fetch(`/getRAM/page=${this.state.currentPage}`)).json();
        this.setState({ list: cardList });
    }

    handleClick() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    handleChange(event) {
        var ram = this.state.ram;
        ram[event.target.name] = event.target.value;
        this.setState({ ram: ram });
    }

    async insertCardDoHoa(event) {
        event.preventDefault();
        console.log(JSON.stringify(this.state.ram));
        await fetch('/insertRAM', {
            method: (this.state.ram.id === '') ? 'POST' : 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.ram),
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

    clearField() {
        this.setState({
            ram: {
                boNhoRAM: "",
                loaiRAM: "",
                tocDoBus: "",
                id: ""
            }
        });
    }

    async handleOnClickTable(id) {
        const ram = await (await fetch(`/ram/${id}`)).json();
        this.setState({ ram: ram });
    }

    async handeClearBtn() {
        this.setState({
            ram: {
                boNhoRAM: "",
                loaiRAM: "",
                tocDoBus: "",
                id: ""
            }
        })
    }

    async componentWillUpdate(nextProps, nextState) {
        if (nextState.currentPage !== this.state.currentPage) {
            const cardList = await (await fetch(`/getRAM/page=${nextState.currentPage}`)).json();
            console.log(cardList);
            this.setState({ list: cardList });
        }
    }

    async handlePreviousPage() {
        if (this.state.currentPage > 1) {
            this.setState({ currentPage: this.state.currentPage - 1 });
        }
    }

    async handleNextPage() {
        if (this.state.currentPage < this.state.totalPages) {
            this.setState({ currentPage: this.state.currentPage + 1 });
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
                                <b>RAM</b>
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
                                                    <th scope="col">Loại RAM</th>
                                                    <th scope="col">Bộ nhớ RAM</th>
                                                    <th scope="col">Tốc độ Bus</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.list.map((value, index) => {
                                                    return <tr onClick={() => this.handleOnClickTable(value.id)}>
                                                        <th scope="row">{value.id}</th>
                                                        <td>{value.loaiRAM}</td>
                                                        <td style={{ width: "20%" }}>{value.boNhoRAM}GB</td>
                                                        <td style={{ width: "20%" }}>
                                                            {value.tocDoBus}gHz</td>
                                                        <td style={{ width: "2%" }}>
                                                            <button type="button" class="btn btn-danger" onClick={() => this.deleteCard(value.id)} style={{ float: "right" }}><i class="fas fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-sm-4 text-dark my-4">
                                    <h2>Thao tác: {this.state.ram.id === '' ? <span class="badge badge-info">Thêm</span> : <span class="badge badge-warning">Chỉnh sữa</span>}</h2>
                                    <form onSubmit={this.insertCardDoHoa}>
                                        <div className="form-group my-2 mx-2">
                                            <label><b>Loại RAM: </b></label>
                                            <input className="form-control" name="loaiRAM" placeholder="Loại RAM" value={this.state.ram.loaiRAM} onChange={this.handleChange} required></input>
                                        </div>
                                        <div className="form-group my-2 mx-2">
                                            <label><b>Bộ nhớ: </b></label>
                                            <input className="form-control" type="number" min="1" max="64" placeholder="Bộ nhớ" name="boNhoRAM" value={this.state.ram.boNhoRAM} onChange={this.handleChange} required></input>
                                        </div>
                                        <div className="form-group my-2 mx-2">
                                            <label><b>Tốc độ Bus: </b></label>
                                            <input className="form-control" type="text" placeholder="Tốc độ Bus" name="tocDoBus" value={this.state.ram.tocDoBus} onChange={this.handleChange} required></input>
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
                                        {this.state.ram.id === '' ? "" : <button type="button" onClick={this.handeClearBtn} class="btn btn-danger my-2 mx-2"><b>Chuyễn sang thao tác thêm</b></button>}
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

export default ram;