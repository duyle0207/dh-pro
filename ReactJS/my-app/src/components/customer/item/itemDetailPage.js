import React from 'react';
import '../../../css/header.css';
import '../../../css/style.css';
import ItemDetail from "./itemDetail";
import Header from '../dashboard/header';
import Footer from '../dashboard/footer';
import CustomerComment from "../commentbox/customerComment";
import InputComment from '../commentbox/inputComment';
import Span from '../../commonComponents/span'

class ItemDetailPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
      visibleCommentBox: false
    });
    this.handleCommentBox = this.handleCommentBox.bind(this);
  }

  handleCommentBox() {
    this.setState({ visibleCommentBox: !this.state.visibleCommentBox });
  }
  render() {
    return (
      <div>
        <Header></Header>
        <div className="container my-4" style={{ marginTop: 50, marginBottom: 50 }}>
          <div className="card">
            <ItemDetail></ItemDetail>
          </div>
        </div>
        <div className="container my-4">
          <div className="card">
            <button className="btn btn-info" type="button" onClick={this.handleCommentBox}>Gửi đánh giá của bạn</button>
          </div>
          <div className="card my-4">
            {(this.state.visibleCommentBox === true) && <InputComment></InputComment> }
          </div>
          <Span content={'Đánh giá của khách hàng về sản phẩm này'}></Span>
          <div className="border-top">
            <CustomerComment 
              image={'https://img.icons8.com/plasticine/2x/user.png'} 
              username={'Lê Văn Duy'} 
              title={'Hàng khá ngon'} 
              content={'Ngon quá'}>
            </CustomerComment> 
            <CustomerComment 
              image={'https://img.icons8.com/plasticine/2x/user.png'} 
              username={'Lê Văn Duy'} 
              title={'Hàng khá ngon'} 
              content={'Ngon quá'}>
            </CustomerComment>  
            <CustomerComment 
              image={'https://img.icons8.com/plasticine/2x/user.png'} 
              username={'Lê Văn Duy'} 
              title={'Hàng khá ngon'} 
              content={'Ngon quá'}>
            </CustomerComment>  
            <CustomerComment 
              image={'https://img.icons8.com/plasticine/2x/user.png'} 
              username={'Lê Văn Duy'} 
              title={'Hàng khá ngon'} 
              content={'Ngon quá'}>
            </CustomerComment>   
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
export default ItemDetailPage;
