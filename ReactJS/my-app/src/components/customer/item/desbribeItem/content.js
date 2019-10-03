import React, { Component } from 'react';

class description extends Component {
    render() {
        return (
            <p className="text-justify">{this.props.content}</p>
        );
    }
}
export default description;