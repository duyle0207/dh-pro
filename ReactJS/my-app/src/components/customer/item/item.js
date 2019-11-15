import React from 'react';
import '../../../css/style.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class item extends React.Component {

  constructor(props) {
    super(props);

    this.state = ({
      product: {}
    })

    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    this.setState({ product: this.props.product });
  }

  async handleAddToCart() {
    // console.log(this.state.product);
    await fetch('/customerUnauthenticated/addToCart/quantity=1', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.product)
    }).then((res) => {
      this.props.history.push("/cart");
    });
  }

  render() {
    return (
      <div className="col-sm-3">
        <figure className="card card-product">
          <Link to={"/itemDetail/" + this.props.id} style={{ textDecoration: "none", color: "black" }}>
            <div className="img-wrap">
              <img src={require(`../../../SpringRestAPI/src/main/webapp/images/${this.props.imgSrc}`)} alt="" />
            </div>
            <figcaption className="info-wrap">
              <h4 className="title">{this.props.brand}</h4>
              <p className="desc">{this.props.lapName}</p>
            </figcaption>
            <div className="bottom-wrap">
              {/* <a href="" class="btn btn-sm btn-primary float-right">Order Now</a> */}
              <div className="price-wrap h5">
                <span className="price-new">{this.props.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
              </div>
            </div>
          </Link>
          <div className="price-wrap">
            <button className="btn btn-info mx-3 my-3" onClick={this.handleAddToCart}>Mua ngay</button>
          </div>
        </figure>
      </div>
    );
  }
}

export default withRouter(item);
