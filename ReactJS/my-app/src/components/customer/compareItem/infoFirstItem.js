import React, { Component } from 'react';

class infoFirstItem extends Component {
    render() {
        return (
            <tr>
                <th scope="row">{this.props.deviceName}</th>
                <td>{this.props.deviceInfo}</td>
            </tr>
        );
    }
}

export default infoFirstItem;