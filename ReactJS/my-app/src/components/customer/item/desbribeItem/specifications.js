import React, { Component } from 'react';

class specifications extends Component {
    render() {
        return (
            <div>
                <h1><span className="badge badge-info mb-2">Thông số kỹ thuật</span></h1>
                <table className="table">
                    <thead className="thead">
                        <tr>
                            <th scope="col">Thông tin chung</th>
                            <th scope="col"/>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Màn Hình</td>
                            <td>Full HD</td>
                        </tr>
                        <tr>
                            <td>Màn Hình</td>
                            <td>Full HD</td>
                        </tr>
                        <tr>
                            <td>Màn Hình</td>
                            <td>Full HD</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default specifications;