import React, { Component } from 'react';

const cardStyle = {
    border: '1px solid #dddddd',
    background: '#fff',
    padding: '15px 15px 15px 10px',
    width: '90%',
}

export class CardDashboard extends Component {
    render() {
        return (
            <div className="col-sm-4">
                <div className="row ml-3" style={cardStyle}>
                    <div className='col-sm-8'>
                        <h3>{this.props.number}</h3>
                        <p>{this.props.desciption}</p>
                    </div>
                    <div className='col-sm-4'>
                    <i class={`fas ${this.props.icon} fa-4x`} style={{color: `${this.props.color}`}}></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardDashboard;
