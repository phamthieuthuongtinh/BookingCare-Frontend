import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { languages } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    render() {
        let { isOpenModal, closeModalBooking, dataTime } = this.props
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }
        // console.log('data props from modal', this.props)
        return (
            // toggle={ }
            <React.Fragment>
                <Modal
                    isOpen={isOpenModal}
                    className={"booking-modal-container"}
                    size='lg'
                    centered
                    backdrop={true}
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'>Thông tin đặt lịch khám bệnh</span>
                            <span
                                className='right'
                                onClick={closeModalBooking}
                            >
                                <i className='fas fa-times'></i>
                            </span>
                        </div>
                        <div className='booking-modal-body'>
                            {/* {JSON.stringify(dataTime)} */}
                            <div className='doctor-infor'>

                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescription={false}
                                    dataTime={dataTime}
                                />
                            </div>

                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>Ho ten</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>So dien thoai</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Email</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Dia chi</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-12 form-group'>
                                    <label>Ly do kham</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Dat cho ai</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Gioi tinh</label>
                                    <input className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking-confirm' onClick={closeModalBooking}>Xac nhan</button>
                            <button className='btn-booking-cancel' onClick={closeModalBooking}>Huy</button>
                        </div>
                    </div>

                </Modal>

            </React.Fragment >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
