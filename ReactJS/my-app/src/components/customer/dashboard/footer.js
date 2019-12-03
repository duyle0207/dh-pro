import React from 'react';
import '../../../css/style.css';
import Logo from "../../../images/logo.png";


class footer extends React.Component {
  render() {
    return (
      <footer style={{ paddingTop: 55 }}>
        <div className="container-fluid" style={{backgroundColor: '#1F2024'}}>
          <div className="container" style={{ paddingTop: 30 }}>
            <div className="row mb-4" id="top-footer-1">
              <div className="col-sm-3">
                <div className="info-footer">
                  <div className="row">
                    <div className="col-sm-3">
                      <img
                        className="img-fluid"
                        src="https://www.thinkpro.vn/theme/frontend/default/images/icon/icon-giaohang.png"
                        alt = {"icon-giaohang"}
                      />
                    </div>
                    <div className="col-sm-9">
                      <h6>Giao hàng hỏa tốc</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="info-footer">
                  <div className="row">
                    <div className="col-sm-3">
                      <img
                        className="img-fluid"
                        src="https://www.thinkpro.vn/theme/frontend/default/images/icon/icon-trainghiem.png"
                        alt = {"icon-giaohang"}
                      />
                    </div>
                    <div className="col-sm-9">
                      <h6>Trải nghiệm sản phẩm tại nhà</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="info-footer">
                  <div className="row">
                    <div className="col-sm-3">
                      <img
                        className="img-fluid"
                        src="https://www.thinkpro.vn/theme/frontend/default/images/icon/icon-baohanh.png"
                        alt = {"icon-giaohang"}
                      />
                    </div>
                    <div className="col-sm-9">
                      <h6>Lỗi đổi tại nhà trong 1 ngày</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="info-footer">
                  <div className="row">
                    <div className="col-sm-3">
                      <img
                        className="img-fluid"
                        src="https://www.thinkpro.vn/theme/frontend/default/images/icon/icon-hotro.png"
                        alt = {"icon-giaohang"}
                      />
                    </div>
                    <div className="col-sm-9">
                      <h6>Hỗ trợ trong suốt thời gian sử dụng </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <img className="img-fluid" src={Logo} alt="" />
              </div>
              <div className="col-sm-3">
                <ul className="list-group">
                  <li className="list-group-item" id="footer-top-list">
                    Hỗ trợ trực tuyến
                  </li>
                  <li className="list-group-item" id="footer-list">
                    Kiểm tra thời hạn bảo hành
                  </li>
                  <li className="list-group-item" id="footer-list">
                    Hỗ trợ trực tuyến
                  </li>
                  <li className="list-group-item" id="footer-list">
                    Chính sách bảo hành
                  </li>
                </ul>
              </div>
              <div className="col-sm-3">
                <ul className="list-group">
                  <li className="list-group-item" id="footer-top-list">
                    Trải nghiệm
            </li>
                  <li className="list-group-item" id="footer-list">
                    Mua hàng trực tuyến
            </li>
                  <li className="list-group-item" id="footer-list">
                    DHPro VietNam FaceBook
            </li>
                  <li className="list-group-item" id="footer-list">
                    Chính sách bảo hành
            </li>
                </ul>
              </div>
              <div className="col-sm-3">
                <ul className="list-group">
                  <li className="list-group-item" id="footer-top-list">
                    Trải nghiệm
            </li>
                  <li className="list-group-item" id="footer-list">
                    Mua hàng trực tuyến
            </li>
                  <li className="list-group-item" id="footer-list">
                    DHPro VietNam FaceBook
            </li>
                  <li className="list-group-item" id="footer-list">
                    Chính sách bảo hành
            </li>
                </ul>
              </div>
            </div>
          </div>
          <hr style={{ backgroundColor: "#878792" }} />
          <div className="container">
            <div className="footer-copyright">
              <p id="footer-copyright">
                2019 © BẢN QUYỀN THUỘC SỞ HỮU CÔNG TY DHPro Solution VIỆT NAM
        </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default footer;
