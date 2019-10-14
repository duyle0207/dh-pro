import React, { Component } from 'react';
import '../../../css/sb-admin.css'
import Product from './product'

class contentAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            productList: []
        });
    }

    async componentDidMount() {
        const list = await (await fetch(`/hung/sanPham`)).json();
        this.setState({ productList: list })
    }
    render() {
        const list = this.state.productList;
        const postList = list.map((p,i) => {
            return <Product key={i}
            idProduct={p.id}
            imageSrc={p.hinh}
            lapName={p.tenSP}
            quantity={p.soLuong}
            lapBrand={p.thuongHieu.tenThuongHieu}></Product>
        });
        return (
            <div id="content-wrapper">
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