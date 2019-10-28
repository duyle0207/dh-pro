import React from 'react';
import '../../../css/style.css';
import { Link } from 'react-router-dom';

class item extends React.Component {
  render() {
    return (
      <div className="col-sm-3">
        <Link to={"/itemDetail/"+this.props.id} style={{ textDecoration: "none", color: "black" }}>
          <figure className="card card-product">
            <div className="img-wrap">
              <img src={require(`../../../SpringRestAPI/src/main/webapp/images/${this.props.imgSrc}`)} alt=""/>
            </div>
            <figcaption className="info-wrap">
              <h4 className="title">{this.props.brand}</h4>
              <p className="desc">{this.props.lapName}</p>
            </figcaption>
            <div className="bottom-wrap">
              {/* <a href="" class="btn btn-sm btn-primary float-right">Order Now</a> */}
              <div className="price-wrap h5">
                <span className="price-new">{this.props.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>{" "}
                {/* <del className="price-old">$1980</del> */}
              </div>
            </div>
          </figure>
        </Link>
      </div>
    );
  }
}

export default item;
