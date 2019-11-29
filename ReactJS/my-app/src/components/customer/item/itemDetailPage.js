import React from 'react';
import '../../../css/header.css';
import '../../../css/style.css';
import ItemDetail from "./itemDetail";
import Header from '../dashboard/header';
import Footer from '../dashboard/footer';
import CustomerComment from "../commentbox/customerComment";
import InputComment from '../commentbox/inputComment';
import Span from '../../commonComponents/span'
import Description from './desbribeItem/describeItem';
import Specification from './desbribeItem/specifications'
import Sum from './desbribeItem/sum';



class ItemDetailPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
      product: {},
      imgList: [],
      mainImg: "",
      visibleCommentBox: false,
      visibleDescription: false,
      visibleSum: true,
      productDetail: {
        hinh: 'https://aliceasmartialarts.com/wp-content/uploads/2017/04/default-image.jpg'
      },
      isLoading: true,
      listBinhLuan: []
    });
    this.handleCommentBox = this.handleCommentBox.bind(this);
    this.handleReadMore = this.handleReadMore.bind(this);
  }

  async componentDidMount() {
    const product = await (await fetch(`/customerUnauthenticated/sanPham/${this.props.match.params.id}`)).json();
    const imgList = await (await fetch(`/customerUnauthenticated/getHinhSP/${this.props.match.params.id}`)).json();
    const listBinhLuan = await (await fetch(`/customerUnauthenticated/getBinhLuanBySPID/${this.props.match.params.id}`)).json();

    this.setState({
      product: product,
      imgList: imgList,
      listBinhLuan: listBinhLuan
    }, () => {
      document.title = this.state.product.tenSP;
    });

    var tempDate = new Date();
    var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    console.log(date);
  }

  handleReadMore() {
    this.setState({
      visibleDescription: !this.state.visibleDescription,
      visibleSum: !this.state.visibleSum
    });
  }

  handleCommentBox() {
    this.setState({ visibleCommentBox: !this.state.visibleCommentBox });
  }

  render() {
    console.log(this.state.productDetail.hinh);
    return (
      <div>
        <Header></Header>
        <div className="container my-4" style={{ marginTop: 50, marginBottom: 50 }}>
          <div className="card">
            {this.state.product.hinh ?
              <ItemDetail
                product={this.state.product}
                imgList={this.state.imgList}
              ></ItemDetail>
              : ""}
          </div>
        </div>
        <div className="container my-4">
          <div className="row">
            {(this.state.visibleDescription === true && this.state.visibleSum === false) ?
              <div className="col-sm-8">
                <h1><span className="badge badge-info mb-2">Mô tả chi tiết sản phẩm</span></h1>
                <Description titleDescription={'Cấu hình mạnh mẽ, hiệu năng ổn định'}
                  content={'Apple Macbook Air 2017 MQD32 được trang bị bộ vi xử lý Intel Core i5 dual-core 1.8GHz, đạt tối đa 2.9GHz, Cache 3MB, RAM 8GB 1600MHz, card đồ họa Intel HD Graphics 6000 giúp máy có thể xử lý nhanh chóng và mượt mà các tác vụ của người dùng như soạn thảo văn bản, chơi game, lướt web, nghe nhạc, Autocad, Photoshop… Ngoài ra, máy còn được trang bị ổ cứng 128GB SSD cung cấp cho người dùng không gian rộng rãi để lưu trữ dữ liệu hay những bộ phim yêu thích.'}
                  ImageSrc={'https://cdn.vinpro.net/uploads/images/general/2019/09/16/laptop-asus-ux433fn-a6124t-000.jpg'}
                >
                </Description>
                <Description titleDescription={'Cấu hình mạnh mẽ, hiệu năng ổn định'}
                  content={'Apple Macbook Air 2017 MQD32 được trang bị bộ vi xử lý Intel Core i5 dual-core 1.8GHz, đạt tối đa 2.9GHz, Cache 3MB, RAM 8GB 1600MHz, card đồ họa Intel HD Graphics 6000 giúp máy có thể xử lý nhanh chóng và mượt mà các tác vụ của người dùng như soạn thảo văn bản, chơi game, lướt web, nghe nhạc, Autocad, Photoshop… Ngoài ra, máy còn được trang bị ổ cứng 128GB SSD cung cấp cho người dùng không gian rộng rãi để lưu trữ dữ liệu hay những bộ phim yêu thích.'}
                  ImageSrc={'https://cdn.vinpro.net/uploads/images/general/2019/09/16/laptop-asus-ux433fn-a6124t-000.jpg'}
                >
                </Description>
                <Description titleDescription={'Cấu hình mạnh mẽ, hiệu năng ổn định'}
                  content={'Apple Macbook Air 2017 MQD32 được trang bị bộ vi xử lý Intel Core i5 dual-core 1.8GHz, đạt tối đa 2.9GHz, Cache 3MB, RAM 8GB 1600MHz, card đồ họa Intel HD Graphics 6000 giúp máy có thể xử lý nhanh chóng và mượt mà các tác vụ của người dùng như soạn thảo văn bản, chơi game, lướt web, nghe nhạc, Autocad, Photoshop… Ngoài ra, máy còn được trang bị ổ cứng 128GB SSD cung cấp cho người dùng không gian rộng rãi để lưu trữ dữ liệu hay những bộ phim yêu thích.'}
                  ImageSrc={'https://cdn.vinpro.net/uploads/images/general/2019/09/16/laptop-asus-ux433fn-a6124t-000.jpg'}
                >
                </Description>
                <div className="my-4" style={{ textAlign: 'center' }}>
                  <button type="button" className="btn btn-outline-info shadow-none" onClick={this.handleReadMore}>Thu gọn</button>
                </div>
              </div>
              :
              <div className="col-sm-8">
                <h1><span className="badge badge-info mb-2">Tóm tắt mô tả sản phẩm</span></h1>
                <Sum sum={this.state.product.tomTat}></Sum>
                {/* <div className="my-4" style={{ textAlign: 'center' }}>
                  <button type="button" className="btn btn-outline-info shadow-none" onClick={this.handleReadMore}>Xem mổ tả đầy đủ</button>
                </div> */}
              </div>
            }
            <div className="col-sm-4">
              {Object.keys(this.state.product).length !== 0 ? <Specification product={this.state.product}></Specification> : ""}
            </div>
          </div>
          <div className="card">
            <button className="btn btn-warning" type="button" onClick={this.handleCommentBox}><b>Gửi đánh giá của bạn</b></button>
          </div>
          <div className="card my-4">
            {(this.state.visibleCommentBox === true) && <InputComment></InputComment>}
          </div>
          <Span content={'Đánh giá của khách hàng về sản phẩm này'}></Span>
          <div className="border-top">
            {this.state.listBinhLuan.map((value) => {
              return <CustomerComment
                image={'https://img.icons8.com/plasticine/2x/user.png'}
                username={value.idkh}
                title={value.tieuDe}
                content={value.noiDung}
                ngayDang={value.ngayDang}>
              </CustomerComment>
            })}
            {/* <CustomerComment
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
            </CustomerComment> */}
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
export default ItemDetailPage;
