import React, { Component } from 'react';

class FilterDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: true,
            value: props.itemName,
            wrapper: props.wrapper
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.setState({
            active: !this.state.active,
        });
        this.props.onUpdate(this.state);
    }

    render() {
        return (
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value={this.props.itemName}
                    onChange={this.handleChange}
                    checked={!this.state.active}
                />
                <label className="form-check-label">
                    <small className="text-muted">{this.props.itemName}</small>
                </label>
            </div>
        )
    }
}

export default FilterDetail;