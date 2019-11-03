import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class product extends Component {

    constructor(props)
    {
        super(props);
        this.state = ({source:""});
    }

    componentDidMount()
    {
        try {
            this.setState({source: require(`../../../SpringRestAPI/src/main/webapp/images/${this.props.imageSrc}`)});
        } catch (error) {
            this.setState({source:""});
        }
        // console.log("Tình trạng: "+this.props.status)
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.idProduct}</th>
                <td>
                    <img src={require(`../../../SpringRestAPI/src/main/webapp/images/${this.props.imageSrc}`)} width="100" height="50"
                        alt='asda' className="img-fluid">
                    </img>
                </td>
                <td><b>{this.props.lapBrand}</b></td>
                <td>{this.props.lapName}</td>
                <td>{this.props.status===true?<img src="https://img.icons8.com/color/48/000000/ok--v2.png" alt='aa'></img>:<img src="https://img.icons8.com/office/40/000000/cancel-2.png"></img>}</td>
                <td><button type="button" className="btn btn-success" onClick={()=>this.props.updateFunc(this.props.idProduct)}>Update status</button></td>
                <td><Link to={`/productDetail/${this.props.idProduct}`} className="btn btn-dark">Xem chi tiết</Link></td>
            </tr>
        );
    }
}

export default product;