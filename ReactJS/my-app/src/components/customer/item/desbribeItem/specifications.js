import React, { Component } from 'react';

class specifications extends Component {

    constructor(props) {
        super(props);
        this.state = ({ isWatchDetail: false });
        this.handleWatchDetail = this.handleWatchDetail.bind(this);
    }

    componentDidMount() {
        console.log(this.props.product);
    }

    handleWatchDetail() {
        this.setState({ isWatchDetail: !this.state.isWatchDetail });
    }

    render() {
        return (
            <div>
                <h1><span className="badge badge-info mb-2">Thông số kỹ thuật</span></h1>
                <table className="table">
                    <thead className="thead">
                        <tr>
                            <th scope="col">Thông tin chung</th>
                            <th scope="col" style={{ width: "200px" }} />
                        </tr>
                    </thead>
                    {this.state.isWatchDetail ?
                        <tbody>
                            <tr>
                                <td>Hệ điều hành</td>
                                <td>{this.props.product.heDieuHanh.tenHeDieuHanh}</td>
                            </tr>
                            <tr>
                                <td>CPU</td>
                                <td>{this.props.product.cpu.tenCPU}</td>
                            </tr>
                            <tr>
                                <td>RAM</td>
                                <td>{this.props.product.ram.loaiRAM} {this.props.product.ram.boNhoRAM}GB {this.props.product.ram.tocDoBus}Hz</td>
                            </tr>
                            <tr>
                                <td>Ổ cứng</td>
                                <td>{this.props.product.oCung.tenOCung} {this.props.product.oCung.dungLuong}GB</td>
                            </tr>
                            <tr>
                                <td>Card đồ họa</td>
                                <td>{this.props.product.cardDoHoa.tenCardDoHoa} {this.props.product.cardDoHoa.boNhoCard}GB</td>
                            </tr>
                            <tr>
                                <td>Màn hình</td>
                                <td>
                                    {this.props.product.manHinh.kichThuoc} inches {this.props.product.manHinh.doPhanGiai} {this.props.product.manHinh.congNgheManHinh}
                                    {this.props.product.manHinh.manHinhCamUng ? " Cảm ứng" : ""}
                                </td>
                            </tr>
                            <tr>
                                <td>Âm thanh</td>
                                <td>{this.props.product.amThanh}</td>
                            </tr>
                            <tr>
                                <td>Pin</td>
                                <td>{this.props.product.pin.thongTinPin} {this.props.product.pin.thoiGianSuDung} {this.props.product.pin.boSac}</td>
                            </tr>
                            <tr>
                                <td>Cổng giao tiếp</td>
                                <td>{this.props.product.congGiaoTiep}</td>
                            </tr>
                            <tr>
                                <td>Độ phân giải Webcam</td>
                                <td>{this.props.product.doPhanGiaiWC}</td>
                            </tr>
                            <tr>
                                <td>Khối lượng</td>
                                <td>{this.props.product.trongLuong}kg</td>
                            </tr>
                            <tr>
                                <td>Kích thước</td>
                                <td>{this.props.product.kichThuoc}</td>
                            </tr>
                        </tbody>
                        :
                        <tbody>
                            <tr>
                                <td>Hệ điều hành</td>
                                <td>{this.props.product.heDieuHanh.tenHeDieuHanh}</td>
                            </tr>
                            <tr>
                                <td>CPU</td>
                                <td>{this.props.product.cpu.tenCPU}</td>
                            </tr>
                            <tr>
                                <td>RAM</td>
                                <td>{this.props.product.ram.loaiRAM} {this.props.product.ram.boNhoRAM}GB {this.props.product.ram.tocDoBus}Hz</td>
                            </tr>
                            <tr>
                                <td>Ổ cứng</td>
                                <td>{this.props.product.oCung.tenOCung} {this.props.product.oCung.dungLuong}GB</td>
                            </tr>
                            <tr>
                                <td>Card đồ họa</td>
                                <td>{this.props.product.cardDoHoa.tenCardDoHoa} {this.props.product.cardDoHoa.boNhoCard}GB</td>
                            </tr>
                        </tbody>
                    }
                </table>
                <div className="my-4" style={{ textAlign: 'center' }}>
                    <button type="button" className="btn btn-outline-info shadow-none" onClick={this.handleWatchDetail}>{this.state.isWatchDetail?"Thu gọn":"Xem mổ tả đầy đủ"}</button>
                </div>
            </div>
        );
    }
}

export default specifications;