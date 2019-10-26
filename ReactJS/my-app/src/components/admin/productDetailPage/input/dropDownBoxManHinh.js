import React, { Component } from 'react';

class dropDownBoxManHinh extends Component {
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
                    {(!this.isEmpty(this.props.detail)) ?<option value>{this.props.detail.doPhanGiai} {this.props.detail.kichThuoc} {this.props.detail.congNgheManHinh} {(this.props.detail.manHinhCamUng === true) ? 'Cảm ứng':''}</option>:
                    <option  value="">Màn hình</option>}
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