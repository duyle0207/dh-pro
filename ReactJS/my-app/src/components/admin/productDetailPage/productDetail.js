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
            isUpdateFail: false,
            isUpdateSuccess: false,
            productDetail: this.sp,
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
            listNhuCauSuDung: [],
            error: {
                tenSpError: '',
                giaError: '',
                soLuongError: '',
                mauSacError: '',
                trongLuongError: '',
                kichThuocError: '',
                amThanhError: '',
                congGiaoTiepError: '',
                doPhanGiaiWCError: '',
                motaSoLuoc: ''
            }
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
        this.checkNull = this.checkNull.bind(this);
    }

    async componentDidMount() {

        var product;
        if (this.props.idProduct !== 'new') {
            const link = '/sanPham/' + this.props.idProduct;
            product = await (await fetch(link)).json();
            this.sp = product;
            this.setState({ productDetail: this.sp });
        }
        else {
            const link = '/sanPham/' + 0;
            product = await (await fetch(link)).json();
            this.sp = product;
            this.setState({ productDetail: this.sp });
        }

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

    async handleChangeCPU(event) {
        var id = event.target.value;
        if (event.target.value === 'true') {
            id = this.state.cpu.id;
        }
        const cpu = await (await fetch(`/cpu/${id}`)).json();
        this.sp.cpu = cpu;
        this.setState({ productDetail: this.sp });
        console.log(this.state.productDetail);
    }

    async handleChangeOCung(event) {
        var id = event.target.value;
        if (event.target.value === 'true') {
            id = this.state.oCung.id;
        }
        const oCung = await (await fetch(`/oCung/${id}`)).json();
        this.sp.oCung = oCung;
        this.setState({ productDetail: this.sp });
        console.log(this.state.productDetail.oCung);
    }

    async handleChangeRAM(event) {
        var id = event.target.value;
        if (event.target.value === 'true') {
            id = this.state.ram.id;
        }
        const ram = await (await fetch(`/ram/${id}`)).json();
        this.sp.ram = ram;
        this.setState({ productDetail: this.sp });
        console.log(this.state.productDetail.ram);
    }

    async handleChangeCard(event) {
        var id = event.target.value;
        if (event.target.value === 'true') {
            id = this.state.cardDoHoa.id;
        }
        const cardDoHoa = await (await fetch(`/cardDoHoa/${id}`)).json();
        this.sp.cardDoHoa = cardDoHoa;
        this.setState({ productDetail: this.sp });
        console.log(this.state.productDetail.cardDoHoa);
    }

    async handleChangeCaManHinh(event) {
        var id = event.target.value;
        if (event.target.value === 'true') {
            id = this.state.manHinh.id;
        }
        const manHinh = await (await fetch(`/manHinh/${id}`)).json();
        this.sp.manHinh = manHinh;
        this.setState({ productDetail: this.sp });
        console.log(this.state.productDetail.manHinh);
    }

    async handleChangePin(event) {
        var id = event.target.value;
        if (event.target.value === 'true') {
            id = this.state.pin.id;
        }
        const pin = await (await fetch(`/manHinh/${id}`)).json();
        this.sp.pin = pin;
        this.setState({ productDetail: this.sp });
        console.log(this.state.productDetail.pin);
    }

    async handleChangeHeDieuHanh(event) {
        var id = event.target.value;
        if (event.target.value === 'true') {
            id = this.state.heDieuHanh.id;
        }
        const heDieuHanh = await (await fetch(`/hung/heDieuHanh/${id}`)).json();
        this.sp.heDieuHanh = heDieuHanh;
        this.setState({ productDetail: this.sp });
        console.log(this.state.productDetail);
    }

    async handleChangeNhuCauSuDung(event) {
        var id = event.target.value;
        if (event.target.value === 'true') {
            id = this.state.nhuCauSuDung.id;
        }
        const nhuCauSuDung = await (await fetch(`/nhuCauSuDung/${id}`)).json();
        this.sp.nhuCauSuDung = nhuCauSuDung;
        this.setState({ productDetail: this.sp });
        console.log(this.state.productDetail);
    }

    async handleChangeThuongHieu(event) {
        var id = event.target.value;
        if (event.target.value === 'true') {
            id = this.state.thuongHieu.id;
        }
        const thuongHieu = await (await fetch(`/hung/thuongHieu/${id}`)).json();
        this.sp.thuongHieu = thuongHieu;
        this.setState({ productDetail: this.sp });
        console.log(this.state.productDetail);
    }

    async updateSanPham(event) {
        event.preventDefault();
        console.log(this.state.productDetail);
        await fetch('/hung/saveSanPham', {
            method: (this.props.idProduct !== 'new') ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.productDetail)
        }).then(res => {
            // console.log(res);
            // this.setState({ isUpdateSuccess: true });
            if (!res.ok) {
                this.setState({ isUpdateFail: true });
            }
            else {
                this.setState({ isUpdateSuccess: true, isUpdateFail: false });
                return res.json();
            }
        }).then(data => console.log(data));
    }

    // validate(event) {
    //     event.preventDefault();
    //     alert(event)
    //     var s = Object.keys(this.state.productDetail);
    //     s.map((value, index) => {
    //         console.log();
    //         // alert(this.state.productDetail[value])
    //     });
    // }

    checkNull() {
        this.setState({ allowUpdate: !this.state.allowUpdate });
        console.log(this.state.allowUpdate);
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
                <form onSubmit={this.updateSanPham}>
                    <div className="row border">

                        <TextBox title="Tên sản phẩm" col="tenSP" value={this.state.productDetail.tenSP} handleChange={this.handleChange}></TextBox>

                        <DropDownBoxCPU title="CPU" col="cpu" list={this.state.listCPU} detail={this.state.cpu} onChange={this.handleChangeCPU}></DropDownBoxCPU>

                        <NumberInput title="Giá" col="gia" value={this.state.productDetail.gia} handleChange={this.handleChange}></NumberInput>

                        <DropDownBoxOCung title="Ổ cứng" col="oCung" list={this.state.listOCung} detail={this.state.oCung} onChange={this.handleChangeOCung}></DropDownBoxOCung>

                        <NumberInput title="Số lượng" col="soLuong" value={this.state.productDetail.soLuong} handleChange={this.handleChange}></NumberInput>

                        <DropDownBoxRAM title="RAM" col="ram" list={this.state.listRAM} detail={this.state.ram} onChange={this.handleChangeRAM}></DropDownBoxRAM>

                        <TextBox title="Màu sắc" col="mauSac" value={this.state.productDetail.mauSac} handleChange={this.handleChange} ></TextBox>

                        <DropDownBoxCard title="Card đồ họa" col="cardDoHoa" list={this.state.listCardDoHoa} detail={this.state.cardDoHoa} onChange={this.handleChangeCard}></DropDownBoxCard>

                        <NumberInput title="Trọng lượng (Kg)" col="trongLuong" value={this.state.productDetail.trongLuong} handleChange={this.handleChange} step="0.1"></NumberInput>

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
                            <button type="submit" className="btn btn-dark mx-2 my-2" ><h5>Lưu</h5></button>
                        </div>
                        {/* onClick={() => { this.checkNull(); this.updateSanPham(); }} */}


                        {(this.state.isUpdateSuccess === true) ?
                            <div className="form-group col-sm-12 my-2">
                                <div className="alert alert-success text-center" role="alert">
                                    Update Successfull
                                </div>
                            </div> : ''}
                        {(this.state.isUpdateFail === true) ?
                            <div className="form-group col-sm-12 my-2">
                                <div className="alert alert-danger text-center" role="alert">
                                    Update Failed
                                </div>
                            </div> : ''}
                    </div>
                </form>
            </div>
        );
    }
}

export default productDetail;