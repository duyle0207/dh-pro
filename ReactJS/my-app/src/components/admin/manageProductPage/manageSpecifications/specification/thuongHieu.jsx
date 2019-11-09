import React, { Component } from 'react';

class thuongHieu extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isOpen: false,
            list: [],
            adminInfo: {},
            thuongHieu: {
                id: "",
                tenThuongHieu: "",
                hinh: ""
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
            adminInfo:adInfo,
        },()=>{
            console.log(this.state.adminInfo);
        });

        const totalPages = await (await fetch(`/getTotalPagesThuongHieu`,{
            headers:{
                'Authorization' : `Bearer ${adInfo.accessToken}`
            }
        })).json();
        this.setState({ totalPages: totalPages });
        const hdhList = await (await fetch(`/getThuongHieu/page=${this.state.currentPage}`,{
            headers:{
                'Authorization' : `Bearer ${adInfo.accessToken}`
            }
        })).json();
        this.setState({ list: hdhList });
        console.log(this.state.list);
    }

    async componentWillUpdate(nextProps, nextState) {
        if (nextState.currentPage !== this.state.currentPage) {
            const cardList = await (await fetch(`/getThuongHieu/page=${nextState.currentPage}`,{
                headers:{
                    'Authorization' : `Bearer ${this.state.adminInfo.accessToken}`
                }
            })).json();
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

    handleClick() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    handleChange(event) {
        var thuongHieu = this.state.thuongHieu;
        thuongHieu[event.target.name] = event.target.value;
        this.setState({ thuongHieu: thuongHieu });
    }

    async insert(event) {
        event.preventDefault();
        await fetch('/insertThuongHieu', {
            method: (this.state.thuongHieu.id === '') ? 'POST' : 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${this.state.adminInfo.accessToken}`
            },
            body: JSON.stringify(this.state.thuongHieu),
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
            thuongHieu: {
                id: "",
                tenThuongHieu: "",
                hinh: ""
            }
        });
    }

    async handleOnClickTable(id) {
        const thuongHieu = await (await fetch(`/thuongHieu/${id}`,{
            headers:{
                'Authorization' : `Bearer ${this.state.adminInfo.accessToken}`
            }
        })).json();
        this.setState({ thuongHieu: thuongHieu });
    }

    handeClearBtn() {
        this.setState({
            thuongHieu: {
                id: "",
                tenThuongHieu: "",
                hinh: ""
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
                                <b>Thương hiệu</b>
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
                                                    <th scope="col">Thương hiệu</th>
                                                    <th scope="col">Ảnh minh họa</th>
                                                    {/* <th scope="col"></th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.list.map((value) => {
                                                    return <tr onClick={() => this.handleOnClickTable(value.id)}>
                                                        <th scope="row">{value.id}</th>
                                                        <td>{value.tenThuongHieu}</td>
                                                        <td>
                                                            <img className="img-fluid" src={value.hinh} alt=""/>
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
                                    <h2>Thao tác: {this.state.thuongHieu.id === '' ? <span class="badge badge-info">Thêm</span> : <span class="badge badge-warning">Chỉnh sữa</span>}</h2>
                                    <form onSubmit={this.insert}>
                                        <div className="form-group my-2 mx-2">
                                            <label><b>Thương hiệu: </b></label>
                                            <input className="form-control" name="tenThuongHieu" placeholder="Tên Hệ điều hành" value={this.state.thuongHieu.tenThuongHieu} onChange={this.handleChange} required></input>
                                        </div>
                                        <div className="form-group my-2 mx-2">
                                            <label><b>Ảnh: </b></label>
                                            <input className="form-control" name="hinh" placeholder="Tên Hệ điều hành" value={this.state.thuongHieu.hinh} onChange={this.handleChange} required></input>
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
                                        {this.state.thuongHieu.id === '' ? "" : <button type="button" onClick={this.handeClearBtn} class="btn btn-danger my-2 mx-2"><b>Chuyễn sang thao tác thêm</b></button>}
                                    </form>
                                </div>
                            </div>
                            <div className="row mx-4">
                                <nav className="float-right" aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item" onClick={this.handlePreviousPage}><a class="page-link"  href="#">Previous</a></li>
                                        <li class="page-item"><a class="page-link" href="#">{this.state.currentPage}</a></li>
                                        <li class="page-item" onClick={this.handleNextPage} ><a class="page-link"  href="#">Next</a></li>
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

export default thuongHieu;