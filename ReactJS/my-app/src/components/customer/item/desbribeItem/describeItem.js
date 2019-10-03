import React, { Component } from 'react';
import DescribedImage from './describedImage';
import Title from './titleDescription';
import Content from './content';

class describeItem extends Component {
    render() {
        return (
            <div>
                <Title titleDescription={this.props.titleDescription}></Title>
                <Content content={this.props.content}></Content>
                <DescribedImage ImageSrc={this.props.ImageSrc}></DescribedImage>
            </div>
        );
    }
}

export default describeItem;