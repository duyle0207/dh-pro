import React, { Component } from 'react';

class mainImage extends Component {
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <img src={this.props.imgSrc} width={500} height={500} alt="MainImage"/>
                <button type="button" className="btn btn-dark mx-4" onClick={this.props.onClick}>Upload</button>
            </div>
        );
    }
}

export default mainImage;