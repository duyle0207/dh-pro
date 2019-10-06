import React, { Component } from 'react';

class searchItem extends Component {
    render() {
        return (
            <th>
                <button type="button" className="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg" style={{ width: '100%', color: 'white' }}>
                    <b>Thêm sản phẩm so sánh</b>
                </button>
                <div className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="myLargeModalLabel">Chọn sản phẩm để so sánh</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input type="text" className="form-control" id="text" placeholder="Nhập sản phẩm mà bạn muốn so sánh"></input>
                                <div className="card">
                                    <div className="card-body">
                                        <button type="button" className="btn btn-warning" data-dismiss="modal" aria-label="Close" onClick={this.props.handleClick}>Sản phẩm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </th>
        );
    }
}

export default searchItem;