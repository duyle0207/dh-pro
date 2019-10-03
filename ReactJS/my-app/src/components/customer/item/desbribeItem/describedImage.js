import React, { Component } from 'react';

class describedImage extends Component {
    componentDidMount()
    {
        console.log(this.props.ImageSrc);
    }
    render() {
        return (
            <img className="img-fluid" src={this.props.ImageSrc} alt="" />
        );
    }
}

export default describedImage;