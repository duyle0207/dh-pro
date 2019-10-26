import React, { Component } from 'react';

class dropDownBox extends Component {
    isEmpty(obj) {
        for (var prop in obj) {
            return false;
        }
        return true;
    }
    render() {
        return (
            <div className="form-group col-sm-6 my-2">
                <label><b>{this.props.title}:</b></label>
                <select id="inputCPU" className="form-control" name={this.props.col} onChange={this.props.onChange} required>
                    {(!this.isEmpty(this.props.detail)) ? <option value>{this.props.detail.loaiRAM} {this.props.detail.boNhoRAM}GB {this.props.detail.tocDoBus}MHz</option> : 
                    <option  value="">RAM</option>}
                    {this.props.list.map((value, index) => {
                        return <option key={index} value={value.id}>{value.loaiRAM} {value.boNhoRAM}GB {value.tocDoBus}MHz</option>
                    })};
                </select>
            </div>
        );
    }
}

export default dropDownBox;