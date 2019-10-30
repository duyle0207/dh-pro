import React, { Component } from 'react';
import ImageItem from './imageItem';
import InfoFirstItem from './infoFirstItem';
import InfoSecondItem from './infoSecondItem';
import Header from '../dashboard/header';
import Footer from '../dashboard/footer';
import '../../../css/style.css';
import SearchItem from './searchItem';
class compareItemsPage extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isCompare: false
        });
        this.handleInsertItemClick = this.handleInsertItemClick.bind(this);
    }
    handleInsertItemClick() {
        this.setState({ isCompare: !this.state.isCompare });
    }
    render() {
        return (
            <div>
                <Header></Header>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <ImageItem imageSrc={'https://cdn.vinpro.net/uploads/images/general/2019/07/24/laptop-msi-gl63-8rc813vn-00.jpg'}
                                            lapBrand={'MSI'}
                                            lapName={'Laptop MSI GL63 8RC(813VN)'}></ImageItem>
                                    </tr>
                                </thead>
                                <tbody>
                                    <InfoFirstItem deviceName={'Bộ vi xử lý'}
                                        deviceInfo={'Intel Core i7-8750H'}>
                                    </InfoFirstItem>
                                    <InfoFirstItem deviceName={'Bộ vi xử lý'}
                                        deviceInfo={'Intel Core i7-8750H'}>
                                    </InfoFirstItem>
                                    <InfoFirstItem deviceName={'Bộ vi xử lý'}
                                        deviceInfo={'Intel Core i7-8750H'}>
                                    </InfoFirstItem>
                                    <InfoFirstItem deviceName={'Bộ vi xử lý'}
                                        deviceInfo={'Intel Core i7-8750H'}>
                                    </InfoFirstItem>
                                    <InfoFirstItem deviceName={'Bộ vi xử lý'}
                                        deviceInfo={'Intel Core i7-8750H'}>
                                    </InfoFirstItem>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-6">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            {(this.state.isCompare === false) ? <div></div> :
                                                <div style={{ textAlign: 'right' }}>
                                                    <button type="button" class="close" aria-label="Close" onClick={this.handleInsertItemClick}>
                                                        <h1 style={{color:'red'}}>&times;</h1>
                                                    </button>
                                                </div>
                                            }
                                        </th>
                                        {(this.state.isCompare === true) ?
                                            <ImageItem imageSrc={'https://cdn.vinpro.net/uploads/images/general/2019/07/24/laptop-msi-gl63-8rc813vn-00.jpg'}
                                                lapBrand={'MSI'}
                                                lapName={'Laptop MSI GL63 8RC(813VN)'}></ImageItem>
                                            :
                                            <SearchItem handleClick={this.handleInsertItemClick}></SearchItem>
                                        }
                                    </tr>
                                </thead>
                                {(this.state.isCompare === true) ?
                                    <tbody>
                                        <InfoSecondItem deviceInfo={'Intel Core i7-8750H'}>
                                        </InfoSecondItem>
                                        <InfoSecondItem deviceInfo={'Intel Core i7-8750H'}>
                                        </InfoSecondItem>
                                        <InfoSecondItem deviceInfo={'Intel Core i7-8750H'}>
                                        </InfoSecondItem>
                                        <InfoSecondItem deviceInfo={'Intel Core i7-8750H'}>
                                        </InfoSecondItem>
                                        <InfoSecondItem deviceInfo={'Intel Core i7-8750H'}>
                                        </InfoSecondItem>
                                    </tbody>
                                    :
                                    <tbody></tbody>
                                }
                            </table>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default compareItemsPage;