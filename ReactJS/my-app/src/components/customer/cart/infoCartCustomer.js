import React, { Component } from 'react';
import '../../../css/style.css';
class infoCartCustomer extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input type="text" className="form-control" id="name" placeholder="Họ tên*" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input type="text" className="form-control" id="name" placeholder="Email" />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input type="text" className="form-control" id="name" placeholder="Số điện thoại*" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <textarea className="form-control" placeholder="Ghi chú thêm nếu có" rows={3} defaultValue={""} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default infoCartCustomer;