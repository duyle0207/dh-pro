import React, { Component } from 'react';
import '../../../css/style.css'
import header from '../dashboard/header';
import { withRouter } from 'react-router';

class inputComment extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            binhLuan: {
                idKH: '',
                idSP: '',
                tieuDe: '',
                noiDung: '',
                ngayDang: this.getCurrentDate()
            }
        });

        this.handleOnChange = this.handleOnChange.bind(this);
        this.postComment = this.postComment.bind(this);
    }

    getCurrentDate() {
        var d = new Date();

        var dd = String(d.getDate()).padStart(2, '0');
        var mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = d.getFullYear();

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // var dateTime = date+' '+time;

        // console.log();

        return String(dd + '-' + mm + '-' + yyyy + ' ' + time);
    }

    async postComment(event) {
        event.preventDefault();
        const isTokenValid = await (await fetch(`/customerUnauthenticated/validateJWT/${JSON.parse(localStorage.getItem("userInfo")).accessToken}`)).json();
        if (!isTokenValid) {
            await fetch(`/customerUnauthenticated/logout`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            localStorage.removeItem("userInfo");
            this.props.history.push('/login?message=unatuthenticated');
        }
        else {
            const token = JSON.parse((localStorage.getItem("userInfo"))).accessToken;
            var comment = this.state.binhLuan;
            comment['idkh'] = JSON.parse((localStorage.getItem("userInfo"))).id;
            comment['idSP'] = this.props.idSP;
            this.setState({
                binhLuan: comment
            }, async () => {
                console.log(this.state.binhLuan);
                await fetch('/insertBinhLuan', {
                    method: 'POST',
                    body: JSON.stringify(this.state.binhLuan),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + token
                    }
                }).then(res => {
                    if (res.ok) {
                        console.log(res);
                        this.props.loadBinhLuan();
                    }
                });
                // console.log(insertBL);
            });
        }
    }

    handleOnChange(event) {
        var comment = this.state.binhLuan;
        comment[event.target.name] = event.target.value;
        this.setState({
            binhLuan: comment
        });
    }

    render() {
        return (
            <div className="container mt-4">
                <form onSubmit={this.postComment}>
                    <div className="row">
                        {/* <div className="col-md-2 col-md-offset-3">
                            <img src={'https://img.icons8.com/plasticine/2x/user.png'} className="rounded" alt="Cinque Terre" />
                        </div> */}
                        <div className="col-md-12 col-md-offset-3">
                            <div className="panel panel-info">
                                <div className="panel-body">
                                    <p className="h4">1. Tiêu đề của nhận xét:</p>
                                    <input type="text" value={this.state.binhLuan.tieuDe} onChange={this.handleOnChange} name="tieuDe" className="form-control my-2" placeholder="Tiêu đề đánh giá" required/>
                                    <p className="h4">2. Viết nhận xét của bạn vào bên dưới:</p>
                                    <textarea placeholder="Bạn nghĩ gì về sản phẩm này" name="noiDung" value={this.state.binhLuan.noiDung} onChange={this.handleOnChange} className="form-control my-2" 
                                    defaultValue={""} rows="4" required/>
                                    <button className="btn btn-danger mb-2" type="submit">Gửi</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(inputComment);