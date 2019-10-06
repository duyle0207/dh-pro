import React, { Component } from 'react';

class imageItem extends Component {
    render() {
        return (
            <th>
                <div style={{ textAlign: 'center' }}>
                    <img className="img-fluid" style={{ maxHeight: '212px' }}
                        src={this.props.imageSrc} alt="" />
                </div>
                <h5>{this.props.lapBrand}</h5>
                <h5>{this.props.lapName}</h5>
            </th>
        );
    }
}

export default imageItem;