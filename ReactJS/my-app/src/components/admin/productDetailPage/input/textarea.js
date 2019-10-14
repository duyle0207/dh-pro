import React, { Component } from 'react';

class textarea extends Component {
    render() {
        return (
            <div className="form-group col-sm-12 my-2">
                <label><b>{this.props.title}:</b></label>
                <textarea name={this.props.col} className="form-control" placeholder={this.props.title} value={this.props.value} type="text" rows="5" onChange={this.props.handleChange}></textarea>
            </div>
        );
    }
}

export default textarea;