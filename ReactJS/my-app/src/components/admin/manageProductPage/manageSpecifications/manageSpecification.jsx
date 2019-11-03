import React, { Component } from 'react';
import CardDoHoa from './specification/cardDoHoa';
import CPU from './specification/cpu';
import HeDieuHanh from './specification/heDieuHanh';
import ManHinh from './specification/manHinh';
import NhuCauSuDung from './specification/nhuCauSuDung';
import OCung from './specification/oCung';
import Pin from './specification/pin';
import RAM from './specification/ram';
import ThuongHieu from './specification/thuongHieu';



class manageSpecification extends Component {
    render() {
        return (
            <div className="container-fluid my-2">
                <div className="row">
                    <CardDoHoa></CardDoHoa>
                    <CPU></CPU>
                    <HeDieuHanh></HeDieuHanh>
                    <ManHinh></ManHinh>
                    <NhuCauSuDung></NhuCauSuDung>
                    <OCung></OCung>
                    <Pin></Pin>
                    <RAM></RAM>
                    <ThuongHieu></ThuongHieu>
                </div>
            </div>
        );
    }
}

export default manageSpecification;