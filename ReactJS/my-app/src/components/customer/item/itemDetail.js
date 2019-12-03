import React from 'react';
import '../../../css/style.css';
import ImageDetail from '../item/imageDetail';
import { withRouter } from 'react-router';

class itemDetail extends React.Component {
  constructor(props) {
    super(props);


    this.state = ({
      MainImg: require(`../../../SpringRestAPI/src/main/webapp/images/${this.props.product.hinh}`),
      imgList: this.props.imgList,
      quantity: 1,
      productQuantity: '',
      choosableQuantity: ''
    });

    this.SetDetailImage = this.SetDetailImage.bind(this);
    this.setMainImage = this.setMainImage.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.PlusQuantity = this.PlusQuantity.bind(this);
    this.SubQuantity = this.SubQuantity.bind(this);
  }

  async componentDidMount() {
    const productQuantity = await (await fetch(`/customerUnauthenticated/getProductQuantity/${this.props.product.id}`)).json();
    const choosableQuantity = await (await fetch(`/customerUnauthenticated/getChoosableQuantity/${this.props.product.id}`)).json();
    console.log(choosableQuantity);
    this.setState({
      productQuantity: productQuantity,
      choosableQuantity: choosableQuantity
    });
  }

  setMainImage(source) {
    this.setState({ MainImg: source });
  }

  SetDetailImage() {
    var i = this.refs.mainIMG.src;
    this.refs.ImgDetail.src = i;
  }

  async addToCart() {
    if(this.state.quantity <= this.state.choosableQuantity)
    {
      await fetch(`/customerUnauthenticated/updateCart/quantity=${this.state.quantity}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.props.product)
      }).then((res) => {
        this.props.history.push("/cart");
      });
    }
    else{
      alert(`Số sản phẩm trong kho chỉ còn ${this.state.choosableQuantity}`);
    }
  }

  async PlusQuantity() {
    var a = this.refs.quantity.value;
    if (parseInt(a) < this.state.choosableQuantity) {
      this.setState({
        quantity: this.state.quantity + 1
      });
    }
    else{
      alert(`Số sản phẩm trong kho chỉ còn ${this.state.choosableQuantity}`);
    }
  }

  async SubQuantity() {
    var a = this.refs.quantity.value;
    if (parseInt(a) > 1) {
      this.setState({
        quantity: this.state.quantity - 1
      });
    }
  }

  render() {
    return (
      <div className="row">
        <aside className="col-sm-5 border-right">
          <article className="gallery-wrap">
            <div className="img-big-wrap">
              <div>
                <a data-toggle="modal" data-target=".bd-example-modal-xl" href="#aaa">
                  <img
                    id="main_img"
                    className="img-fluid"
                    alt='abc'
                    onClick={this.SetDetailImage} ref="mainIMG"
                    src={this.state.MainImg}
                  />
                </a>
              </div>
              <div
                id="detail-pro"
                className="modal fade bd-example-modal-xl"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="myExtraLargeModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-xl" style={{ width: 500 }}>
                  <div className="modal-content">
                    <img id="detail-img" className="img-fluid" ref="ImgDetail" src="" alt='abc' />
                  </div>
                </div>
              </div>
            </div>
            <div className="img-small-wrap">
              {this.state.imgList.map((value, index) => {
                return <ImageDetail key={index} src={require(`../../../SpringRestAPI/src/main/webapp/images/${value.hinh}`)} p={this.setMainImage}></ImageDetail>
              })}
              {/* <ImageDetail src="https://cdn.vinpro.net/uploads/images/general/2019/09/16/1b66a8be390fc278c0c4b1bec30097dc.jpg" p={this.setMainImage}></ImageDetail>
              <ImageDetail src="https://cdn.vinpro.net/uploads/images/general/2019/09/16/0c2e2bc7e9d0cea2cf7e39c4b8c5d2ed.jpg" p={this.setMainImage}></ImageDetail>
              <ImageDetail src="https://cdn.vinpro.net/uploads/images/general/2019/09/16/1b66a8be390fc278c0c4b1bec30097dc.jpg" p={this.setMainImage}></ImageDetail>
              <ImageDetail src="https://cdn.vinpro.net/uploads/images/general/2019/09/16/bc02f99be44aea029a0db44c5ba1aed2.jpg" p={this.setMainImage}></ImageDetail> */}
            </div>
          </article>
        </aside>
        <aside className="col-sm-7">
          <article className="card-body p-5">
            <h3 className="title mb-3">{this.props.product.tenSP}</h3>
            <p className="price-detail-wrap">
              <span className="price h3 text-warning">
                <span className="num">{this.props.product.gia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
              </span>
            </p>
            <div className="row">
              <div className="col-sm-6">
                <dl className="param param-feature">
                  <dt>Màu sắc</dt>
                  <dd>{this.props.product.mauSac}</dd>
                </dl>
                <dl className="param param-feature">
                  <dt>Hệ điều hành</dt>
                  <dd>{this.props.product.heDieuHanh.tenHeDieuHanh}</dd>
                </dl>
                <dl className="param param-feature">
                  <dt>CPU</dt>
                  <dd>{this.props.product.cpu.tenCPU}</dd>
                </dl>
                <dl className="param param-feature">
                  <dt>RAM</dt>
                  <dd>{this.props.product.ram.loaiRAM} {this.props.product.ram.boNhoRAM}GB {this.props.product.ram.tocDoBus}Hz</dd>
                </dl>
                <dl className="param param-feature">
                  <dt>Card đồ họa</dt>
                  <dd>{this.props.product.cardDoHoa.tenCardDoHoa} {this.props.product.cardDoHoa.boNhoCard}GB</dd>
                </dl>
              </div>
              <div className="col-sm-6">
                <dl className="param param-feature">
                  <dt>Cân nặng</dt>
                  <dd>{this.props.product.trongLuong}kg</dd>
                </dl>
                <dl className="param param-feature">
                  <dt>Màn hình</dt>
                  <dd>
                    {this.props.product.manHinh.kichThuoc} inches {this.props.product.manHinh.doPhanGiai} {this.props.product.manHinh.congNgheManHinh}
                    {this.props.product.manHinh.manHinhCamUng ? " Cảm ứng" : ""}
                  </dd>
                </dl>
              </div>
            </div>
            <hr />
            <div className="row mb-3">
              <div className="col-sm-3">
                <p className="h5 mt-2 text-gray">Số lượng: </p>
              </div>
              <div className="col-sm-4">
                <div className="btn-group btn-group-sm" role="group" aria-label="..." style={{ float: 'left' }}>
                  <button className="btn btn-light shadow-none" type="button" style={{ color: 'black', float: 'right', width: '40px' }} onClick={this.SubQuantity} ref="sub">
                    -
                  </button>
                  <input className="form-control" id="quantity" type="text" value={this.state.quantity}
                    onChange={this.CheckQuantity} disabled={true}
                    style={{ height: '40px', width: '50px' }} ref="quantity" />
                  <button className="btn btn-light shadow-none" type="button" style={{ color: 'black', float: 'left', width: '40px' }} onClick={this.PlusQuantity} ref="plus">
                    +
                  </button>
                </div>
              </div>
              <div className="col-sm-5">
                <p className="h6 mt-2 text-secondary ">{this.state.productQuantity}  Sản phẫm có sẳn </p>
              </div>
            </div>
            <div className="row" role="group" aria-label="Basic example">
              <a href="#aaa" className="btn btn-lg btn-outline-info text-uppercase shadow-none" onClick={this.addToCart}>
                <i className="fas fa-shopping-cart" />
                &nbsp;&nbsp;Thêm vào giỏ hàng
              </a>
            </div>
            <div className="row mt-2" role="group" aria-label="Basic example">
              <a href={"/compareItem/" + this.props.product.id} className="btn btn-lg btn-warning text-uppercase shadow-none" style={{ color: 'white' }}>
                So sánh chi tiết
              </a>
            </div>
          </article>
        </aside>
      </div>
    );
  }
}

export default withRouter(itemDetail);
