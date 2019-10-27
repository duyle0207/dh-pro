import React from 'react';
import '../../../css/header.css';
import '../../../css/style.css';
import HeadContent from "../dashboard/headContent";
import Item from "../../customer/item/item";

class content extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
      productList: []
    })
  }

  async componentDidMount() {
    const list = await(await fetch(`/hung/sanPham`)).json();
    this.setState({ productList: list })
  }


  render() {
    var list = this.state.productList.map((value,index)=>{return <Item imgSrc={value.hinh} lapName={value.tensp} brand={value.thuongHieu.tenThuongHieu} price={value.gia}></Item>})
    return (
      <div className="content">
        <HeadContent></HeadContent>
        <div className="list-laptop">
          <div className="container">
            <div className="row">
              {list}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default content;
