import React, { Component } from 'react';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            user: {},
            value: '',
            dataFile: new FormData()
        });
        this.handleChange = this.handleChange.bind(this);

        this.handleClickUploadFile = this.handleClickUploadFile.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    // async componentDidMount()
    // {
    //     const link = '/api/account/'+ this.props.match.params.id;
    //     const acc = await (await fetch(link)).json();
    //     this.setState({
    //         user: acc
    //     });
    // }

    handleChange(event) {
        let name = event.target.name;
        let acc = this.state.user;
        acc[name] = event.target.value;
        this.setState({ acc });
    }

    handleFile(event) {
        const data = new FormData();
        for (var i = 0; i < event.target.files.length; i++) {
            data.append("file", event.target.files[i]);
        }
        this.setState({ dataFile: data });
    }

    async handleClickUploadFile() {
        fetch('/api/savefile', {
            method: 'post',
            body: this.state.dataFile
        }).then(res => {
            if (res.ok) {
                console.log(res.data);
                alert("File uploaded successfully.")
            }
        });
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group files color">
                                <label>Upload Your File </label>
                                <input type="file" className="form-control" multiple name="file" onChange={this.handleFile} />
                            </div>
                        </div>
                        <button className="btn btn-primary btn-block" onClick={this.handleClickUploadFile} onChange={this.handleFile}>
                            Upload
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Upload;