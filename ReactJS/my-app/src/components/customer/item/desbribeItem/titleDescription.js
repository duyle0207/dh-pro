import React, { Component } from 'react';

class titleDescription extends Component {
    render() {
        return (
            <h5 className="my-4">{this.props.titleDescription}</h5>
        );
    }
}   

export default titleDescription;