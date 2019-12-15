import React from 'react';
import '../../../css/header.css';
import '../../../css/style.css';
import {Link} from 'react-router-dom';

class headContent extends React.Component {
  render() {
    return (
      <div>
        <div>
          <div className="container my-2">
            <div id="carouselId" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#carouselId" data-slide-to={0} className="active" />
                <li data-target="#carouselId" data-slide-to={1} />
                <li data-target="#carouselId" data-slide-to={2} />
              </ol>
              <div className="carousel-inner" role="listbox" style={{ height: "70%" }}>
                <div className="carousel-item active">
                  <img
                    src="https://promocje.msi.com/wp-content/uploads/2019/10/msi-prestige-wacom-1900x600.png"
                    alt="First slide"
                    className="img-fluid"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://osomnimedia.com/wp-content/uploads/2018/06/ps-single-cove3-1900x600-min.png"
                    alt="First slide"
                    className="img-fluid"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://www.captainscabin.com/pub/media/codazon/slideshow/cache/1900x600/s/a/salebanner2.png"
                    alt="First slide"
                    className="img-fluid"
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselId"
                role="button"
                data-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselId"
                role="button"
                data-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
              </a>
            </div>{" "}
            {/*end carousel slide*/}
          </div>
          <div className="filter">
            <div className="container">
              <div className="row my-2">
                <div className="col-sm-12">
                  <h4 className="main-title">
                    
                </h4>
                </div>
              </div>
              <div className="row my-2">
                <div className="col-sm-1">
                  <img
                    src="https://www.thinkpro.vn/uploads/images/userfiles/logo/dell.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-sm-1">
                  <img
                    src="https://www.thinkpro.vn/uploads/images/userfiles/logo/hp.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-sm-1">
                  <img
                    src="https://www.thinkpro.vn/uploads/images/userfiles/logo/thinkpad.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-sm-1">
                  <img
                    src="https://www.thinkpro.vn/uploads/images/userfiles/acerlogo.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-sm-1">
                  <img
                    src="https://www.thinkpro.vn/uploads/images/userfiles/alienware_thinkpro.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-sm-1">
                  <img
                    src="https://www.thinkpro.vn/uploads/images/userfiles/logo/lenovo.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-sm-1">
                  <img
                    src="https://www.thinkpro.vn/uploads/images/userfiles/logo/razer.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-sm-1">
                  <img
                    src="https://www.thinkpro.vn/uploads/images/userfiles/logo_asus_thinkpro1.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-sm-1">
                  <img
                    src="https://www.thinkpro.vn/uploads/images/userfiles/logo/apple.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-sm-1">
                  <img
                    src="https://www.thinkpro.vn/uploads/images/userfiles/logo_msi_thinkpro.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-sm-1">
                  <img
                    src="https://www.thinkpro.vn/uploads/images/userfiles/logomicrosoftthinkpro1.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-sm-1">
                  <img
                    src="https://www.thinkpro.vn/uploads/images/userfiles/logolgthinkpro1.jpg"
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
              {/* <div className="row my-4">
                <div className="col-sm-12">
                  <span className="title">Mức giá:</span>
                  <a href="#abc" className="option">
                    Từ 10 - 15 triệu
                  </a>
                  <a href="#abc" className="option">
                    Từ 15 - 20 triệu
                  </a>
                  <a href="#abc" className="option">
                    Từ 20 - 25 triệu
                  </a>
                  <a href="#abc" className="option">
                    Từ 25 - 30 triệu
                  </a>
                  <a href="#abc" className="option">
                    Từ 30 - 50 triệu
                  </a>
                  <a href="#abc" className="option">
                    Trên 50 triệu
                  </a>
                </div>
              </div>
              <div className="row my-4">
                <div className="col-sm-12">
                  <span className="title">Nhu cầu sử dụng:</span>
                  <a href="#abc" className="option">
                    Văn phòng - Học tập cơ bản
                  </a>
                  <a className="option" href="#abc" >
                    Học tập - Chơi game
                  </a>
                  <a href="#abc" className="option">
                    Doanh nhân - Lịch lãm
                  </a>
                  <a href="#abc" className="option">
                    Đồ họa - Kĩ thuật
                  </a>
                  <a href="#abc" className="option">
                    Gaming tầm trung
                  </a>
                  <a href="#abc" className="option">
                    Gaming cao cấp
                  </a>
                </div>
              </div> */}
              <div className="row">
                <div className="col-sm-12">
                  <hr />
                </div>
              </div>
            </div>
          </div>{" "}
          {/*end filter*/}
        </div>
        <div className="module-title my-2">
          <div className="container">
            <div className="col-sm-12" style={{ borderLeft: "5px solid #27bece" }}>
              <Link to="/products">Laptop</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default headContent;
