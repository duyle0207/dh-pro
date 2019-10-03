import React, { Component } from 'react'

class searchDemo extends Component {

    constructor(props) {
        super(props)
        this.state = { repos: [],value: '' }
        this.getAccount = this.getAccount.bind(this);
        this.handOnChange = this.handOnChange.bind(this);
    }
    HiItems(items) {
        console.log(items)
    }

    async getAccount(event) {
        var link = '/api/getdata?username=' + event.target.value;
        if (event.target.value === '') {
            this.setState({ repos: [] });
        }
        else {
            fetch(link).then((response) => {
                return response.json();
            }).then((results) => {
                this.setState({ repos: results });
            });
        }
    }

    handOnChange(event)
    {
        let v = event.target.value;
        this.setState({value:v});
    }
    render() {
        return (
            <div className="container">
                <label>Search</label>
                <div className="form-group">
                    <input type="text" name="search" onKeyUp={this.getAccount} onChange={this.handOnChange} id="search" placeholder="Search" required="required" autoFocus="autofocus" ref="search" />
                    {(this.state.value ==='') ? 
                        <div>No data</div>
                        :this.state.repos.map((acc, index) =>
                        <div key={index}>
                            <div>{acc.username}</div>
                            <div>{acc.password}</div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
export default searchDemo;