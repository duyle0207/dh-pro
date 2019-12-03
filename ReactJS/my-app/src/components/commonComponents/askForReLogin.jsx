import React, { Component } from 'react';
import { withRouter } from 'react-router';

class askForReLogin extends Component {

    handleCloseClick()
    {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container">
                <div aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p className="h4"><span className="badge badge-warning">Phiên đăng nhập của bạn đã hết hạn</span></p>
                            </div>
                            <div className="modal-footer">
                                {/* <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.handleCloseClick()}>Đóng</button> */}
                                <button type="button" className="btn btn-success">Đăng nhập lại</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default withRouter(askForReLogin);