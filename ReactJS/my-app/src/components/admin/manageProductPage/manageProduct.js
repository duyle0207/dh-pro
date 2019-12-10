import React, { Component } from 'react';
import '../../../css/sb-admin.css'
import Product from './product'
import { withRouter, Redirect } from 'react-router';
import Pagination from "../../Pagination";

const pageLimit = 8;

class contentAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            productList: [],
            currentProducts: [],
        });
        this.searchOnChange = this.searchOnChange.bind(this);
        this.deleteSanPham = this.deleteSanPham.bind(this);
    }

    async componentDidMount() {
        var adInfo = JSON.parse(localStorage.getItem("adminInfo"));
        const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
        if (!isTokenValid) {
            localStorage.removeItem("adminInfo");
            this.props.history.push('/loginAdmin?message=tokenexpired');
        }
        else {
            if (adInfo.accessToken) {
                const list = await (await fetch(`/hung/sanPham`, {
                    headers: {
                        'method': 'GET',
                        'Authorization': `Bearer ${adInfo.accessToken}`
                    }
                }
                )).json();
                this.setState({ productList: list })
                this.setState({ currentProducts: this.state.productList.slice(0, pageLimit) });
            }
        }
    }

    onPageChanged = data => {
        const offset = (data.currentPage - 1) * data.pageLimit;
        const currentProducts = this.state.productList.slice(offset, offset + data.pageLimit);
        this.setState({
            currentProducts: currentProducts,
        });
    }

    async searchOnChange(event) {
        // const list = await (await fetch('/searchSPAdmin/' + event.target.value)).json();
        var adInfo = JSON.parse(localStorage.getItem("adminInfo"));
        fetch('/searchSPAdmin/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adInfo.accessToken}`
            },
            body: (!event.target.value ? "%" : event.target.value)
        }).then(res => res.json()).then(result => {
            if (result.error === "Forbidden" && result.status === 403) {
                localStorage.removeItem("adminInfo");
                this.props.history.push('/loginAdmin?message=tokenexpired');
            }
            else {
                this.setState({ productList: result });
            }
        });
    }

    async deleteSanPham(id) {
        const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("adminInfo")).accessToken}`)).json();
        if (!isTokenValid) {
            this.props.history.push('/loginAdmin?message=tokenexpired');
        }
        else {
            var adInfo = JSON.parse(localStorage.getItem("adminInfo"));
            fetch(`/updateStatusSanPham/${id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adInfo.accessToken}`
                }
            }).then(() => {
                this.componentDidMount();
                // const newList = this.state.productList.filter(i => i.id!==id);
                // this.setState({ productList: newList });
            });
        }
    }

    render() {
        const list = this.state.currentProducts;
        console.log(list);
        const postList = list.map((p, i) => {
            return <Product key={i}
                idProduct={p.id}
                imageSrc={p.hinh}
                lapName={p.tenSP}
                status={p.status}
                soLuong={p.soLuong}
                gia={p.gia}
                lapBrand={p.thuongHieu.tenThuongHieu}
                updateFunc={this.deleteSanPham}
            ></Product>
        });
        return (
            <div id="content-wrapper">
                {/* <div className="container-fluid my-4" style={{ backgroundColor: '#' }}>
                    <div className="input-group text-center">
                        <input type="text" className="form-control" style={{ width: '95%' }}
                            placeholder="Search for..."
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                            onChange={this.searchOnChange}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <i className="fas fa-search" />
                            </button>
                        </div>
                    </div>
                </div> */}
                <div className="container-fluid" style={{ backgroundColor: '#' }}>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Ảnh minh họa</th>
                                <th scope="col">Thương hiệu</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Giá</th>
                                {/* <th scope="col">Tình trạng</th> */}
                                {/* <th scope="col"></th> */}
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {postList}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                    {
                        (this.state.currentProducts.length > 0) &&
                        <Pagination totalRecords={this.state.productList.length} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                    }
                </div>
                </div>
            </div>
        );
    }
}

export default withRouter(contentAdmin);