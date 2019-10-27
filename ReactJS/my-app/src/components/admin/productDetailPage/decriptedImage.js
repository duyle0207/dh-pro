import React, { Component } from 'react';

class decriptedImage extends Component {

    constructor(props)
    {
        super(props);
        this.state = ({source:this.props.imgSrc})
    }

    componentDidMount()
    {
        // console.log(this.props.imgSrc);
    }

    render() {
        return (
            <div className="row my-4 text-center">
                <div className="col-sm-12">
                    <li className="list-group-item" style={{ border: 'none' }}>
                        <img src={this.props.imgSrc} width={100} alt="" />
                    </li>
                </div>
            </div>
        );
    }
}

export default decriptedImage;