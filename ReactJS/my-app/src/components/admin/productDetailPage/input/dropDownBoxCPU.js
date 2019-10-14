import React, { Component } from 'react';

class dropDownBox extends Component {

    render() {
        return (
            <div className="form-group col-sm-6 my-2">
                <label><b>{this.props.title}:</b></label>
                <select id="inputCPU" className="form-control" name={this.props.col} onChange={this.props.onChange}>
                    <option value>{this.props.detail.tenCPU}</option>
                    {this.props.list.map((value, index) => {
                        return <option key={index} value={value.id}>{value.tenCPU}</option>
                    })};
                </select>
            </div>
        );
    }
}

export default dropDownBox;