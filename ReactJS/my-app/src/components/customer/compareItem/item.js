import React, { Component } from 'react';

class item extends Component {
    render() {
        return (
            <div className="col-sm-3" onClick={()=>this.props.handleClick(this.props.id)} data-dismiss="modal">
                <div className="card-deck mx-1 my-1">
                    <img className="img-fluid mx-2 my-2" src={this.props.imageSrc} alt="" />
                    <p className="mx-2 my-2">{this.props.lapName}</p>
                </div>
            </div>
        );
    }
}

export default item;