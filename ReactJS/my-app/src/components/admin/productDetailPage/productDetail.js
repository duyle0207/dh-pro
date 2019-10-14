import React, { Component } from 'react';
import Span from "../../commonComponents/spanH3";
import MainImg from "./mainImage";
import DecriptedImg from "./decriptedImage";
import TextBox from "../productDetailPage/input/textBox";
import DropDownBoxCPU from "./input/dropDownBoxCPU";
import DropDownBoxOCung from "./input/dropDownBoxOCung";
import DropDownBoxRAM from "./input/dropDownBoxRAM";
import DropDownBoxCard from "./input/dropDownBoxCard";
import DropDownBoxManHinh from "./input/dropDownBoxManHinh";
import DropDownBoxPin from "./input/dropDownBoxPin";
import DropDownBoxHeDieuHanh from "./input/dropDownBoxHeDieuHanh";
import DropDownBoxNhuCauSuDung from "./input/dropDownBoxNhuCauSuDung";
import DropDownBoxThuongHieu from "./input/dropDownBoxThuong";
import NumberInput from "./input/numberInput";
import Textarea from "./input/textarea";



class productDetail extends Component {
    sp = {
        "id": "",
        "tenSP": "",
        "gia": "",
        "mauSac": "",
        "trongLuong": "",
        "kichThuoc": "",
        "amThanh": "",
        "congGiaoTiep": "",
        "doPhanGiaiWC": "",
        "cpu": {
            "tenCPU": "",
            "tocDoCPU": "",
            "congNgheCPU": "",
            "boNhoDemCPU": "",
            "tocDoTurbo": "",
            "id": ""
        },
        "oCung": {
            "tenOCung": "",
            "dungLuong": "",
            "id": ""
        },
        "ram": {
            "boNhoRAM": "",
            "loaiRAM": "",
            "tocDoBus": "",
            "id": ""
        },
        "cardDoHoa": {
            "id": "",
            "tenCardDoHoa": "",
            "boNhoCard": "",
            "thietKeCard": ""
        },
        "manHinh": {
            "kichThuoc": "",
            "doPhanGiai": "",
            "congNgheManHinh": "",
            "manHinhCamUng": false,
            "id": ""
        },
        "pin": {
            "id": "",
            "thongTinPin": "",
            "thoiGianSuDung": "",
            "boSac": ""
        },
        "heDieuHanh": {
            "id": "",
            "tenHeDieuHanh": ""
        },
        "thuongHieu": {
            "id": "",
            "tenThuongHieu": "",
            "hinh": ""
        },
        "nhuCauSuDung": {
            "tenNhuCauSuDung": "",
            "id": ""
        },
        "soLuong": "",
        "hinh": "",
        "tomTat": "",
        "listBinhLuan": []
    };
    constructor(props) {
        super(props);
        this.state = ({
            isUpdateSuccess: false,
            productDetail: {},
            value: '',
            cpu: {},
            listCPU: [],
            oCung: {},
            listOCung: [],
            ram: {},
            listRAM: [],
            cardDoHoa: {},
            listCardDoHoa: [],
            manHinh: {},
            listManHinh: [],
            pin: {},
            listPin: [],
            heDieuHanh: {},
            listHeDieuHanh: [],
            thuongHieu: {},
            listThuongHieu: [],
            nhuCauSuDung: {},
            listNhuCauSuDung: []
        });
        this.updateSanPham = this.updateSanPham.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCPU = this.handleChangeCPU.bind(this);
        this.handleChangeOCung = this.handleChangeOCung.bind(this);
        this.handleChangeRAM = this.handleChangeRAM.bind(this);
        this.handleChangeCard = this.handleChangeCard.bind(this);
        this.handleChangeCaManHinh = this.handleChangeCaManHinh.bind(this);
        this.handleChangePin = this.handleChangePin.bind(this);
        this.handleChangeHeDieuHanh = this.handleChangeHeDieuHanh.bind(this);
        this.handleChangeNhuCauSuDung = this.handleChangeNhuCauSuDung.bind(this);
        this.handleChangeThuongHieu = this.handleChangeThuongHieu.bind(this);
    }

    async componentDidMount() {
        const link = '/sanPham/' + this.props.idProduct;
        const product = await (await fetch(link)).json();
        this.sp = product;
        const cpuList = await (await fetch(`/listCPU`)).json();
        const oCungList = await (await fetch(`/listOCung`)).json();
        const ramList = await (await fetch(`/listRam`)).json();
        const cardList = await (await fetch(`/hung/cardDoHoa`)).json();
        const manHinhList = await (await fetch(`/listManHinh`)).json();
        const pinList = await (await fetch(`/hung/listPin`)).json();
        const heDieuHanhList = await (await fetch(`/hung/listHeDieuHanh`)).json();
        const nhuCauSuDungList = await (await fetch(`/listNhuCauSuDung`)).json();
        const thuongHieuList = await (await fetch(`/hung/listThuongHieu`)).json();

        this.setState({
            productDetail: product,
            cpu: product.cpu,
            listCPU: cpuList,
            oCung: product.oCung,
            listOCung: oCungList,
            ram: product.ram,
            listRAM: ramList,
            cardDoHoa: product.cardDoHoa,
            listCardDoHoa: cardList,
            manHinh: product.manHinh,
            listManHinh: manHinhList,
            pin: product.pin,
            listPin: pinList,
            heDieuHanh: product.heDieuHanh,
            listHeDieuHanh: heDieuHanhList,
            nhuCauSuDung: product.nhuCauSuDung,
            listNhuCauSuDung: nhuCauSuDungList,
            thuongHieu: product.thuongHieu,
            listThuongHieu: thuongHieuList
        });
    }

    handleChange(event) {
        let name = event.target.name;
        let product = this.state.productDetail;
        product[name] = event.target.value;
        this.setState({ product });
    }

    async handleChangeCPU(even) {
        var id = even.target.value;
        if(even.target.value === 'true')
        {
            id = this.state.cpu.id;
        }
        const cpu = await (await fetch(`/cpu/${id}`)).json();
        this.sp.cpu = cpu;
        this.setState({ productDetail: this.sp });
        console.log(this.state.productDetail.cpu);
    }

    async handleChangeOCung(event) {
        const oCung = await (await fetch(`/oCung/${event.target.value}`)).json();
        this.sp.oCung = oCung;
        this.setState({ productDetail: this.sp });
        console.log(this.state.productDetail.oCung);
    }

    async handleChangeRAM(event) {
        const ram = await (await fetch(`/ram/${event.target.value}`)).json();
        this.sp.ram = ram;
        this.setState({ productDetail: this.sp });
        console.log(this.state.productDetail.ram);
    }

    async handleChangeCard(event) {
        const cardDoHoa = await (await fetch(`/cardDoHoa/${event.target.value}`)).json();
        this.sp.cardDoHoa = cardDoHoa;
        this.setState({ productDetail: this.sp });
        console.log(this.state.productDetail.cardDoHoa);
    }

    async handleChangeCaManHinh(event) {
        const manHinh = await (await fetch(`/manHinh/${event.target.value}`)).json();
        this.sp.manHinh = manHinh;
        this.setState({ productDetail: this.sp });
        console.log(this.state.productDetail.manHinh);
    }

    async handleChangePin(event) {
        const pin = await (await fetch(`/manHinh/${event.target.value}`)).json();
        this.sp.pin = pin;
        this.setState({ productDetail: this.sp });
        console.log(this.state.productDetail.pin);
    }

    async handleChangeHeDieuHanh(event) {
        const heDieuHanh = await (await fetch(`/hung/heDieuHanh/${event.target.value}`)).json();
        this.sp.heDieuHanh = heDieuHanh;
        this.setState({ productDetail: this.sp });
        console.log(this.state.productDetail);
    }

    async handleChangeNhuCauSuDung(event) {
        const nhuCauSuDung = await (await fetch(`/nhuCauSuDung/${event.target.value}`)).json();
        this.sp.nhuCauSuDung = nhuCauSuDung;
        this.setState({ productDetail: this.sp });
        console.log(this.state.productDetail);
    }

    async handleChangeThuongHieu(event) {
        const thuongHieu = await (await fetch(`/hung/thuongHieu/${event.target.value}`)).json();
        this.sp.thuongHieu = thuongHieu;
        this.setState({ productDetail: this.sp });
        console.log(this.state.productDetail);
    }

    async updateSanPham() {
        await fetch('/hung/saveSanPham', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.productDetail)
        }).then(res => {
            this.setState({isUpdateSuccess:true});
        })
    }

    render() {

        return (
            <div className="container-fluid mx-4" style={{ marginBottom: '100px' }}>
                <div className="row mt-4">
                    <Span content="Hình ảnh sản phẩm"></Span>
                </div>
                <div className="row my-2">
                    <div className="col-sm-8 border">
                        <MainImg imgSrc={this.state.productDetail.hinh}></MainImg>
                    </div>
                    <div className="col-sm-4 border">
                        <ul className="list-group">
                            <DecriptedImg imgSrc="https://www.thinkpro.vn/uploads/images/2019/09/20/thumb_550x550_156897550912901.jpg"></DecriptedImg>
                            <DecriptedImg imgSrc="https://www.thinkpro.vn/uploads/images/2019/09/20/thumb_550x550_156897550912901.jpg"></DecriptedImg>
                            <DecriptedImg imgSrc="https://www.thinkpro.vn/uploads/images/2019/09/20/thumb_550x550_156897550912901.jpg"></DecriptedImg>
                            <DecriptedImg imgSrc="https://www.thinkpro.vn/uploads/images/2019/09/20/thumb_550x550_156897550912901.jpg"></DecriptedImg>
                        </ul>
                    </div>
                </div>
                <div className="row mt-4">
                    <Span content="Thông số chi tiết"></Span>
                </div>
                <div className="row border">
                    <TextBox title="Tên sản phẩm" col="tenSP" value={this.state.productDetail.tenSP} handleChange={this.handleChange}></TextBox>

                    <DropDownBoxCPU title="CPU" col="cpu" list={this.state.listCPU} detail={this.state.cpu} onChange={this.handleChangeCPU}></DropDownBoxCPU>

                    <NumberInput title="Giá" col="gia" value={this.state.productDetail.gia} handleChange={this.handleChange}></NumberInput>

                    <DropDownBoxOCung title="Ổ cứng" col="oCung" list={this.state.listOCung} detail={this.state.oCung} onChange={this.handleChangeOCung}></DropDownBoxOCung>

                    <NumberInput title="Số lượng" col="soLuong" value={this.state.productDetail.soLuong} handleChange={this.handleChange}></NumberInput>

                    <DropDownBoxRAM title="RAM" col="ram" list={this.state.listRAM} detail={this.state.ram} onChange={this.handleChangeRAM}></DropDownBoxRAM>

                    <TextBox title="Màu sắc" col="mauSac" value={this.state.productDetail.mauSac} handleChange={this.handleChange} ></TextBox>

                    <DropDownBoxCard title="Card đồ họa" col="cardDoHoa" list={this.state.listCardDoHoa} detail={this.state.cardDoHoa} onChange={this.handleChangeCard}></DropDownBoxCard>

                    <TextBox title="Trọng lượng (Kg)" col="trongLuong" value={this.state.productDetail.trongLuong} handleChange={this.handleChange}></TextBox>

                    <DropDownBoxManHinh title="Màn hình" col="manHinh" list={this.state.listManHinh} detail={this.state.manHinh} onChange={this.handleChangeCaManHinh}></DropDownBoxManHinh>

                    <TextBox title="Kích thước" col="kichThuoc" value={this.state.productDetail.kichThuoc} handleChange={this.handleChange}></TextBox>

                    <DropDownBoxPin title="Pin" col="pin" list={this.state.listPin} detail={this.state.pin} onChange={this.handleChangePin}></DropDownBoxPin>

                    <TextBox title="Âm thanh" col="amThanh" value={this.state.productDetail.amThanh} handleChange={this.handleChange}></TextBox>

                    <DropDownBoxHeDieuHanh title="Hệ điều hành" col="heDieuHanh" list={this.state.listHeDieuHanh} detail={this.state.heDieuHanh} onChange={this.handleChangeHeDieuHanh}></DropDownBoxHeDieuHanh>

                    <TextBox title="Cổng giao tiếp" col="congGiaoTiep" value={this.state.productDetail.congGiaoTiep} handleChange={this.handleChange}></TextBox>

                    <DropDownBoxNhuCauSuDung title="Nhu cầu sử dụng" col="nhuCauSuDung" list={this.state.listNhuCauSuDung} detail={this.state.nhuCauSuDung} onChange={this.handleChangeNhuCauSuDung}></DropDownBoxNhuCauSuDung>

                    <TextBox title="Độ phân giải Webcam" col="doPhanGiaiWC" value={this.state.productDetail.doPhanGiaiWC} handleChange={this.handleChange}></TextBox>

                    <DropDownBoxThuongHieu title="Thương hiệu" col="thuongHieu" list={this.state.listThuongHieu} detail={this.state.thuongHieu} onChange={this.handleChangeThuongHieu}></DropDownBoxThuongHieu>

                    <Textarea title="Mô tả sơ lược" col="tomTat" value={this.state.productDetail.tomTat} handleChange={this.handleChange}></Textarea>

                    <div className="form-group col-sm-12 my-2 text-right">
                        <button type="button" className="btn btn-dark mx-2 my-2" onClick={this.updateSanPham}><h5>Lưu</h5></button>
                    </div>

                    {(this.state.isUpdateSuccess === true)? 
                    <div className="form-group col-sm-12 my-2">
                        <div className="alert alert-success text-center" role="alert">
                            Update Successfull
                        </div>
                    </div>:''}
                </div>
            </div>
        );
    }
}

export default productDetail;