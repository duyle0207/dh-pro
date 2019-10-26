import React, { Component } from 'react';
import '../../../css/sb-admin.css'
import Product from './product'

class contentAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            productList: []
        });
        this.searchOnChange = this.searchOnChange.bind(this);
        this.deleteSanPham = this.deleteSanPham.bind(this);
    }

    async componentDidMount() {
        const list = await (await fetch(`/hung/sanPham`)).json();
        this.setState({ productList: list })
        console.log(this.state.productList);
    }

    async searchOnChange(event) {
        // const list = await (await fetch('/searchSPAdmin/' + event.target.value)).json();
        fetch('/searchSPAdmin/', {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: (!event.target.value? "%":event.target.value)
        }).then(res => res.json()).then(result=>{
            this.setState({ productList: result });
        });
        console.log(this.state.productList);
    }

    async deleteSanPham(id)
    {
        fetch(`/hung/deleteSanPham/${id}`, {
            method: 'DELETE',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(()=>{
            const newList = this.state.productList.filter(i => i.id!==id);
            this.setState({ productList: newList });
        });
    }

    render() {
        const list = this.state.productList;
        console.log(list);
        const postList = list.map((p, i) => {
            return <Product key={i}
                idProduct={p.id}
                imageSrc={p.hinh}
                lapName={p.tenSP}
                quantity={p.soLuong}
                lapBrand={p.thuongHieu.tenThuongHieu}
                deleteFunc={this.deleteSanPham}
                ></Product>
        });
        return (
            <div id="content-wrapper">
                <div className="container-fluid my-4" style={{ backgroundColor: '#' }}>
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
                </div>
                <div className="container-fluid" style={{ backgroundColor: '#' }}>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Ảnh minh họa</th>
                                <th scope="col">Thương hiệu</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {postList}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default contentAdmin;