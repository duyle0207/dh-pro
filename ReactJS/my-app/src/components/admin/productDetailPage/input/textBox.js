import React, { Component } from 'react';

class textBox extends Component {
 
    render() {
        return (
            <div className="form-group col-sm-6 my-2">
                <label><b>{this.props.title}:</b></label>
                <input name={this.props.col} className="form-control" placeholder={this.props.title} value={this.props.value} onChange={this.props.handleChange}></input>
            </div>
        );
    }
}

export default textBox;