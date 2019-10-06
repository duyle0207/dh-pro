import React, { Component } from 'react';

class infoSecondItem extends Component {
    render() {
        return (
            <tr>
                <th scope="row"></th>
                <td>{this.props.deviceInfo}</td>
            </tr>
        );
    }
}

export default infoSecondItem;