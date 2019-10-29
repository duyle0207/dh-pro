import React, { Component } from 'react';
import Item from './item';

class searchItem extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            productList: []
        });
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    async componentDidMount()
    {
        const product = await(await fetch(`/hung/sanPham/`)).json();
        this.setState({productList:product});
    }

    handleOnChange(event)
    {
        fetch('/searchSPAdmin/', {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: (!event.target.value? "%":event.target.value)
        }).then(res => res.json()).then(result=>{
            this.setState({ productList: result });
        });
    }

    render() {
        return (
            <th>
                <button type="button" className="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg" style={{ width: '100%', color: 'white' }}>
                    <b>Thêm sản phẩm so sánh</b>
                </button>
                <div className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="myLargeModalLabel">Chọn sản phẩm để so sánh</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ overflow: 'auto', height: "800px" }}>
                                <input type="text" className="form-control" id="text" placeholder="Nhập sản phẩm mà bạn muốn so sánh" onChange={this.handleOnChange}></input>
                                <div className="row">
                                    {this.state.productList.map((value,index)=>{return <Item i={index} id={value.id} imageSrc={require(`../../../SpringRestAPI/src/main/webapp/images/${value.hinh}`)} 
                                    lapName={value.tenSP} handleClick={this.props.handleClick}></Item>})}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </th>
        );
    }
}

export default searchItem;