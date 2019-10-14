import React, { Component } from 'react';

class decriptedImage extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-6">
                    <li className="list-group-item" style={{ border: 'none' }}>
                        <img src={this.props.imgSrc} width={100} alt="" />
                    </li>
                </div>
                <div className="col-sm-6">
                    <button type="button" className="btn btn-dark mx-4" style={{ marginTop: '40px' }}>Chỉnh sữa</button>
                </div>
            </div>
        );
    }
}

export default decriptedImage;