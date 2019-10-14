import React, { Component } from 'react';

class dropDownBoxManHinh extends Component {
    render() {
        return (
            <div className="form-group col-sm-6 my-2">
                <label><b>{this.props.title}:</b></label>
                <select id="inputCPU" className="form-control" name={this.props.col} onChange={this.props.onChange}>
                    {this.props.list.map((value, index) => {
                        return <option key={index} value={value.id}>
                            {value.doPhanGiai} {value.kichThuoc} {value.congNgheManHinh} {(value.manHinhCamUng === true) ? 'Cảm ứng':''}
                        </option>
                    })};
                </select>
            </div>
        );
    }
}

export default dropDownBoxManHinh;