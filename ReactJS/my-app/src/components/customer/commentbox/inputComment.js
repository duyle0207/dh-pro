import React, { Component } from 'react';
import '../../../css/style.css'

class inputComment extends Component {
    render() {
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-2 col-md-offset-3">
                        <img src={'https://img.icons8.com/plasticine/2x/user.png'} className="rounded" alt="Cinque Terre" />
                    </div>
                    <div className="col-md-10 col-md-offset-3">
                        <div className="panel panel-info">
                            <div className="panel-body">
                                <textarea placeholder="Bạn nghĩ gì về sản phẩm này" className="pb-cmnt-textarea" defaultValue={""} />
                                <button className="btn btn-danger" type="button">Gửi</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default inputComment;