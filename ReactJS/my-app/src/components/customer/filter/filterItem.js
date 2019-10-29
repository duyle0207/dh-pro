import React, { Component } from 'react';

class FilterItem extends Component {
    render() {
        return (
            <div>
                <p className="row mt-4 mb-2">
                    <strong className="col-10">{this.props.filterName}</strong>
                    <a className="col-2 text-dark" data-toggle="collapse" aria-expanded="true" aria-controls={`${this.props.collapseId}`} href={`#${this.props.collapseId}`}><i className=" fas fa-sort-down"></i></a>
                </p>
                {this.props.children}
            </div>
        )
    }
}

export default FilterItem;