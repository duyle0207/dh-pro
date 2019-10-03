import React, { Component } from 'react';
import '../../../css/style.css';

class customerComment extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="my-4">
                <div className="row mx-2">
                    <div className="col-sm-2 my-2" style={{textAlign:"center"}}>
                        <img className="rounded-circle mr-3" style={{ width: 64, height: 64,alignContent:"center" }}
                            src={this.props.image} alt='sss' />
                        <p className="info-cart" style={{textAlign:"center"}}>{this.props.username}</p>
                    </div>
                    <div className="col-sm-10 border-left my-2">
                        <div className="media-body">
                            <h5 className="mt-0">{this.props.title}</h5>
                            <p>{this.props.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default customerComment;