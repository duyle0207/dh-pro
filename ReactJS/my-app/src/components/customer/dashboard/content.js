import React from 'react';
import '../../../css/header.css';
import '../../../css/style.css';
import HeadContent from "../dashboard/headContent";
import Item from "../../customer/item/item";
import { Link, Redirect } from 'react-router-dom';

class content extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
      productList: [],
      bestSeller: []
    })
  }

  async componentDidMount() {
    document.title = "DHPro hệ thống bán lẻ laptop nhập khẩu giá rẻ toàn quốc"
    const list = await (await fetch(`/customerUnauthenticated/sanPham12`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTcyOTM0ODk2LCJleHAiOjE1NzM1Mzk2OTZ9.8wJ2czvjfsxlgKUQ7n7Rok4LmHMPDU9nXcdcDsm3s6MMnX0pGH1My-NiciDpYNRe6x9oH_en_clyMVsGQ5cB3A'
      }
    })).json();
    const bestSeller = await (await fetch(`/customerUnauthenticated/bestSeller`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTcyOTM0ODk2LCJleHAiOjE1NzM1Mzk2OTZ9.8wJ2czvjfsxlgKUQ7n7Rok4LmHMPDU9nXcdcDsm3s6MMnX0pGH1My-NiciDpYNRe6x9oH_en_clyMVsGQ5cB3A'
      }
    })).json();
    this.setState({ productList: list, bestSeller: bestSeller })
    // console.log(list);
  }

  render() {
    var list = this.state.productList.map((value, index) => {
      if (value.soLuong > 0) {
        return <Item imgSrc={value.hinh} lapName={value.tenSP} brand={value.thuongHieu.tenThuongHieu} price={value.gia} id={value.id} key={index} product={value}></Item>
      }
    });
    var listBestSeller = this.state.bestSeller.map((value, index) => {
      if (value.soLuong > 0) {
        return <Item imgSrc={value.hinh} lapName={value.tenSP} brand={value.thuongHieu.tenThuongHieu} price={value.gia} id={value.id} key={index} product={value}></Item>
      }
    });
    return (
      <div className="content">
        <HeadContent></HeadContent>
        <div className="list-laptop">
          <div className="container">
            <div className="row">
              {list}
            </div>
            <div className="row text-center mt-2" style={{textAlign:"center",marginLeft:'505px'}}>
              {/* <button className="btn btn-info btn-sm shadow-none">Xem mổ tả đầy đủ</button> */}
              <button type="button" class="btn btn-outline-info">
                <Link className="text-decoration-none text-dark" to="/products">Xem thêm</Link>
              </button>
            </div>
          </div>
          {/* <button className="btn btn-info btn-sm shadow-none">Xem mổ tả đầy đủ</button> */}
        </div>
        <div className="list-laptop">
          <div className="module-title my-4">
            <div className="container">
              <div className="col-sm-12" style={{ borderLeft: "5px solid #27bece" }}>
                <p className="h3">Sản phẩm bán chạy</p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              {listBestSeller}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default content;
