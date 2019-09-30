import React from 'react';
import '../css/style.css';
import '../js/cart.js';
import ImageDetail from './imageDetail';

class itemDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      MainImg: "https://cdn.vinpro.net/uploads/images/general/2019/09/16/laptop-asus-ux433fn-a6124t-000.jpg"
    });

    this.SetDetailImage = this.SetDetailImage.bind(this);
    this.setMainImage = this.setMainImage.bind(this);
  }
  setMainImage(source)
  {
    this.setState({MainImg:source});
  }
  SetDetailImage()
  {
    var i = this.refs.mainIMG.src;
    this.refs.ImgDetail.src = i;
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
                    alt = 'abc'
                    onClick={this.SetDetailImage} ref = "mainIMG"
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
                <div className="modal-dialog modal-xl" style={{width:500}}>
                  <div className="modal-content">
                    <img id="detail-img" className="img-fluid" ref = "ImgDetail" src="" alt='abc' />
                  </div>
                </div>
              </div>
            </div>
            {/* slider-product.// */}
            <div className="img-small-wrap">
              <ImageDetail src="https://cdn.vinpro.net/uploads/images/general/2019/09/16/1b66a8be390fc278c0c4b1bec30097dc.jpg" p ={this.setMainImage}></ImageDetail>
              <ImageDetail src="https://cdn.vinpro.net/uploads/images/general/2019/09/16/0c2e2bc7e9d0cea2cf7e39c4b8c5d2ed.jpg" p ={this.setMainImage}></ImageDetail>
              <ImageDetail src="https://cdn.vinpro.net/uploads/images/general/2019/09/16/1b66a8be390fc278c0c4b1bec30097dc.jpg" p ={this.setMainImage}></ImageDetail>
              <ImageDetail src="https://cdn.vinpro.net/uploads/images/general/2019/09/16/bc02f99be44aea029a0db44c5ba1aed2.jpg" p ={this.setMainImage}></ImageDetail>     
            </div>
            {/* slider-nav.// */}
          </article>{" "}
          {/* gallery-wrap .end// */}
        </aside>
        <aside className="col-sm-7">
          <article className="card-body p-5">
            <h3 className="title mb-3">Original Version of Some product name</h3>
            <p className="price-detail-wrap">
              <span className="price h3 text-warning">
                <span className="currency">US $</span>
                <span className="num">1299</span>
              </span>
              <span>/per kg</span>
            </p>{" "}
            <dl className="param param-feature">
              <dt>Model#</dt>
              <dd>12345611</dd>
            </dl>{" "}
            {/* item-property-hor .// */}
            <dl className="param param-feature">
              <dt>Color</dt>
              <dd>Black and white</dd>
            </dl>{" "}
            {/* item-property-hor .// */}
            <dl className="param param-feature">
              <dt>Delivery</dt>
              <dd>Russia, USA, and Europe</dd>
            </dl>
            {/* item-property-hor .// */}
            <hr />
            <div className="row">
              <div className="col-sm-5">
                <dl className="param param-inline">
                  <dt>Quantity: </dt>
                  <dd>
                    <select
                      className="form-control form-control-sm"
                      style={{ width: 70 }}
                    >
                      <option> 1 </option>
                      <option> 2 </option>
                      <option> 3 </option>
                    </select>
                  </dd>
                </dl>{" "}
                {/* item-property .// */}
              </div>{" "}
              {/* col.// */}
            </div>{" "}
            {/* row.// */}
            <hr />
            <a href="#aaa" className="btn btn-lg btn-primary text-uppercase">
              {" "}
              Buy now{" "}
            </a>
            <a href="#aaa" className="btn btn-lg btn-outline-primary text-uppercase">
              {" "}
              <i className="fas fa-shopping-cart" /> Add to cart{" "}
            </a>
          </article>{" "}
          {/* card-body.// */}
        </aside>{" "}
        {/* col.// */}
      </div>
    );
  }
}

export default itemDetail;
