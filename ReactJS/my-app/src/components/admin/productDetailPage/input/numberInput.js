import React, { Component } from 'react';

class numberInput extends Component {
    render() {
        return (
            <div className="form-group col-sm-6 my-2">
                <label><b>{this.props.title}:</b></label>
                <input name={this.props.col} className="form-control" placeholder={this.props.title} value={this.props.value|| ''} type="number" min="1" step={this.props.step} onChange={this.props.handleChange} required></input>
            </div>
        );
    }
}

export default numberInput;