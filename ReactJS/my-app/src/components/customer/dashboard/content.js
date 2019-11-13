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
    const list = await(await fetch(`/customerUnauthenticated/sanPham`,{
      method: 'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTcyOTM0ODk2LCJleHAiOjE1NzM1Mzk2OTZ9.8wJ2czvjfsxlgKUQ7n7Rok4LmHMPDU9nXcdcDsm3s6MMnX0pGH1My-NiciDpYNRe6x9oH_en_clyMVsGQ5cB3A'
      }
    })).json();
    this.setState({ productList: list })
    console.log(list);
  }

  render() {
    var list = this.state.productList.map((value,index)=>{
        if(value.status===true)
        {
          return <Item imgSrc={value.hinh} lapName={value.tenSP} brand={value.thuongHieu.tenThuongHieu} price={value.gia} id={value.id} key={index} product={value}></Item>
        }
      })
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
