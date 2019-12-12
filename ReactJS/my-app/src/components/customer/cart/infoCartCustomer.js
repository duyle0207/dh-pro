import React, { Component } from 'react';
import '../../../css/style.css';
class infoCartCustomer extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input type="text" className="form-control" name="ten" placeholder="Họ tên*" value={this.props.hoaDon.ten} onChange={this.props.handleOnChange} required/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input type="email" className="form-control" name="email" pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
                             placeholder="Email" value={this.props.hoaDon.email} onChange={this.props.handleOnChange} title="Hãy nhập đúng định dạng Email" required/>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input type="text" className="form-control" name="soDT" pattern="(09|01[2|6|8|9])+([0-9]{8})\b" title="Hãy nhập đúng định dạng số điện thoại" 
                             placeholder="Số điện thoại*" value={this.props.hoaDon.soDT} onChange={this.props.handleOnChange} required/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input type="text" className="form-control" name="diaChi" placeholder="Địa chỉ*" value={this.props.hoaDon.diaChi} onChange={this.props.handleOnChange} required/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <textarea className="form-control" name="note" placeholder="Ghi chú thêm nếu có" rows={3} onChange={this.props.handleOnChange} defaultValue={""} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default infoCartCustomer;