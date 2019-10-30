import React, { Component } from 'react';
import ImageItem from './imageItem';
import InfoFirstItem from './infoFirstItem';
import InfoSecondItem from './infoSecondItem';
import Header from '../dashboard/header';
import Footer from '../dashboard/footer';
import '../../../css/style.css';
import SearchItem from './searchItem';
class compareItemsPage extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isCompare: false,
            product: {},
            cpu: {},
            oCung: {},
            ram: {},
            cardDoHoa: {},
            manHinh: {},
            pin: {},
            heDieuHanh: {},
            thuongHieu: {},
            nhuCauSuDung: {},
            hinh: "",
            secondItem: {}
        });
        this.handleInsertItemClick = this.handleInsertItemClick.bind(this);
        this.handleCloseCompare = this.handleCloseCompare.bind(this);
    }

    async componentDidMount() {
        console.log(this.props.match.params.id);
        const product = await(await fetch(`/hung/sanPham/${this.props.match.params.id}`)).json();
        this.setState({ product: product });

        this.setState({
            cpu: product.cpu,
            oCung: product.oCung,
            ram: product.ram,
            cardDoHoa: product.cardDoHoa,
            manHinh: product.manHinh,
            pin: product.pin,
            heDieuHanh: product.heDieuHanh,
            nhuCauSuDung: product.nhuCauSuDung,
            thuongHieu: product.thuongHieu,
            hinh: product.hinh
        });

    }

    async handleInsertItemClick(itemId) {
        const product = await(await fetch(`/hung/sanPham/${itemId}`)).json();
        this.setState({ secondItem: product });
        console.log(this.state.secondItem);
        this.setState({ isCompare: !this.state.isCompare });
    }

    handleCloseCompare()
    {
        this.setState({ isCompare: !this.state.isCompare });
    }
    render() {
        return (
            <div>
                <Header></Header>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th></th>
                                        {this.state.hinh?
                                        <ImageItem imageSrc={require(`../../../SpringRestAPI/src/main/webapp/images/${this.state.hinh}`)}
                                        lapBrand={this.state.heDieuHanh.tenHeDieuHanh}
                                        lapName={this.state.product.tenSP}></ImageItem>    
                                        :
                                        ""
                                        }
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <InfoFirstItem deviceName={'Hệ điều hành'}
                                        deviceInfo={this.state.heDieuHanh.tenHeDieuHanh}>
                                    </InfoFirstItem>
                                    <InfoFirstItem deviceName={"CPU"}
                                        deviceInfo={this.state.cpu.tenCPU}>
                                    </InfoFirstItem>
                                    <InfoFirstItem deviceName={'RAM'}
                                        deviceInfo={this.state.ram.loaiRAM + " " + this.state.ram.boNhoRAM + "GB " + this.state.ram.tocDoBus+"Hz"}>
                                    </InfoFirstItem>
                                    <InfoFirstItem deviceName={'Ổ cứng'}
                                        deviceInfo={this.state.oCung.tenOCung + " " + this.state.oCung.dungLuong +"GB"}>
                                    </InfoFirstItem>
                                    <InfoFirstItem deviceName={'Card đồ họa'}
                                        deviceInfo={this.state.cardDoHoa.tenCardDoHoa + " " + this.state.cardDoHoa.boNhoCard}>
                                    </InfoFirstItem>
                                    <InfoFirstItem deviceName={'Âm thanh'}
                                        deviceInfo={this.state.product.amThanh}>
                                    </InfoFirstItem>
                                    <InfoFirstItem deviceName={'Màn hình'}
                                        deviceInfo={this.state.manHinh.kichThuoc + " inches " + 
                                        this.state.manHinh.doPhanGiai + " " +
                                        this.state.manHinh.congNgheManHinh + " " +
                                        (this.state.manHinh.manHinhCamUng?"Cảm ứng":"")}>
                                    </InfoFirstItem>
                                    <InfoFirstItem deviceName={'Pin'}
                                        deviceInfo={this.state.pin.thongTinPin+" "+
                                        this.state.pin.thoiGianSuDung+"h "+
                                        this.state.pin.boSac}>
                                    </InfoFirstItem>
                                    <InfoFirstItem deviceName={'Độ phân giải Webcam'}
                                        deviceInfo={this.state.product.doPhanGiaiWC}>
                                    </InfoFirstItem>
                                    <InfoFirstItem deviceName={'Khối lượng'}
                                        deviceInfo={this.state.product.trongLuong+"kg"}>
                                    </InfoFirstItem>
                                    <InfoFirstItem deviceName={'Kích thước'}
                                        deviceInfo={this.state.product.kichThuoc}>
                                    </InfoFirstItem>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-6">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            {(this.state.isCompare === false) ? <div></div> :
                                                <div style={{ textAlign: 'right' }}>
                                                    <button type="button" className="close" aria-label="Close" onClick={this.handleCloseCompare}>
                                                        <h1 style={{ color: 'red' }}>&times;</h1>
                                                    </button>
                                                </div>
                                            }
                                        </th>
                                        {(this.state.isCompare === true) ?
                                            <ImageItem imageSrc={require(`../../../SpringRestAPI/src/main/webapp/images/${this.state.secondItem.hinh}`)}
                                                lapBrand={'MSI'}
                                                lapName={'Laptop MSI GL63 8RC(813VN)'}></ImageItem>
                                            :
                                            <SearchItem handleClick={this.handleInsertItemClick}></SearchItem>
                                        }
                                    </tr>
                                </thead>
                                {(this.state.isCompare === true) ?
                                    <tbody>
                                        <InfoSecondItem deviceInfo={this.state.secondItem.heDieuHanh.tenHeDieuHanh}>
                                        </InfoSecondItem>
                                        <InfoSecondItem deviceInfo={this.state.secondItem.cpu.tenCPU}>
                                        </InfoSecondItem>
                                        <InfoSecondItem deviceInfo={this.state.secondItem.ram.loaiRAM + " " + this.state.secondItem.ram.boNhoRAM + "GB " + this.state.secondItem.ram.tocDoBus+"Hz"}>
                                        </InfoSecondItem>
                                        <InfoSecondItem deviceInfo={this.state.secondItem.oCung.tenOCung + " " + this.state.secondItem.oCung.dungLuong +"GB"}>
                                        </InfoSecondItem>
                                        <InfoSecondItem deviceInfo={this.state.secondItem.cardDoHoa.tenCardDoHoa + " " + this.state.secondItem.cardDoHoa.boNhoCard}>
                                        </InfoSecondItem>
                                        <InfoSecondItem deviceInfo={this.state.secondItem.amThanh}>
                                        </InfoSecondItem>
                                        <InfoSecondItem deviceInfo={this.state.secondItem.manHinh.kichThuoc + " inches " + 
                                        this.state.secondItem.manHinh.doPhanGiai + " " +
                                        this.state.secondItem.manHinh.congNgheManHinh + " " +
                                        (this.state.secondItem.manHinh.manHinhCamUng?"Cảm ứng":"")}>
                                        </InfoSecondItem>
                                        <InfoSecondItem deviceInfo={this.state.secondItem.pin.thongTinPin+" "+
                                        this.state.secondItem.pin.thoiGianSuDung+"h "+
                                        this.state.secondItem.pin.boSac}></InfoSecondItem>
                                        <InfoSecondItem deviceInfo={this.state.secondItem.doPhanGiaiWC}></InfoSecondItem>
                                        <InfoSecondItem deviceInfo={this.state.secondItem.trongLuong}></InfoSecondItem>
                                        <InfoSecondItem deviceInfo={this.state.secondItem.kichThuoc}></InfoSecondItem>
                                    </tbody>
                                    :
                                    <tbody></tbody>
                                }
                            </table>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default compareItemsPage;