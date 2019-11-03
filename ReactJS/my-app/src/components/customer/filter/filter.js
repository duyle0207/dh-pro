import React, { Component } from 'react';
//Slider
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priceRange: [0, 100],
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(priceRange) {
        this.setState({ priceRange }, () => {
            this.props.onUpdate(this.state.priceRange);
        });
    }

    render() {
        return (
            <div >
                <h5 className="mb-4">Bộ lọc sản phẩm</h5>
                <div className="gia">
                    <p><strong>Mức giá</strong></p>
                    <Range min={0}
                        max={100}
                        defaultValue={this.state.priceRange}
                        allowCross={false}
                        onChange={priceRange => this.handleChange(priceRange)} />
                    <span><strong className="text-muted">{this.state.priceRange[0]}</strong> triệu</span>
                    <span style={{ float: "right" }}><strong className="text-muted">{this.state.priceRange[1]}</strong> triệu</span>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default Filter;