import React, { Component } from 'react';

class sum extends Component {
    render() {
        return (
            <div>
                <p className="text-justify">{this.props.sum}</p>
            </div>
        );
    }
}

export default sum;