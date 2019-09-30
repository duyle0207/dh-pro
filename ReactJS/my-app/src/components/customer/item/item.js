import React from 'react';
import '../../../css/style.css';

class item extends React.Component {
  render() {
    return (
      <div className="col-sm-3">
        <a href="/itemDetail" style={{ textDecoration: "none", color: "black" }}>
          <figure className="card card-product">
            <div className="img-wrap">
              <img src="https://cdn.vinpro.net/uploads/images/general/2019/09/16/laptop-asus-ux433fn-a6124t-000.jpg" alt=""/>
            </div>
            <figcaption className="info-wrap">
              <h4 className="title">ASUS</h4>
              <p className="desc">Laptop ASUS UX433FA-A6106T</p>
            </figcaption>
            <div className="bottom-wrap">
              {/* <a href="" class="btn btn-sm btn-primary float-right">Order Now</a> */}
              <div className="price-wrap h5">
                <span className="price-new">$1280</span>{" "}
                <del className="price-old">$1980</del>
              </div>
            </div>
          </figure>
        </a>
      </div>
    );
  }
}

export default item;
