import React from 'react';
import '../../../css/style.css';
import '../../../js/cart.js';

class itemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.ChangeImage = this.ChangeImage.bind(this);
  }
  ChangeImage(a) {
    this.props.p(a);
  }
  render() {
    return (
      <div className="item-gallery">
        <img
          className="img-fluid"
          alt = ''
          onClick={()=>this.ChangeImage(this.props.src)}
          src={this.props.src}
          ref = "imageDetail"
        />
      </div>
    );
  }
}

export default itemDetail;
