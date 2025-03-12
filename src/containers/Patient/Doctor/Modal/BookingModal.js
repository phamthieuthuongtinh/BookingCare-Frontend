import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { languages } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            address: '',
            reason: '',
            birthday: '',
            genders: '',
            doctorId: '',
            selectedGender: '',
            timeType: ''
        }
    }

    componentDidMount() {
        this.props.fecthGenders();

    }
    buildDataGender = (data) => {

        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {

            data.map(item => {
                let obj = {};
                obj.label = language === languages.VI ? item.valueVi : item.valueEn;
                obj.value = item.keyMap;
                result.push(obj);
            })

        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId
                let timeType = this.props.dataTime.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })

            }

        }
    }

    handleOnChangeInput = (event, id) => {
        let copyState = {
            ...this.state
        }
        let valueInput = event.target.value
        copyState[id] = valueInput;
        this.setState({
            ...copyState
        }

        )
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedGender: selectedOption });
    };
    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        // console.log('check state profile', dataTime)
        if (dataTime && !_.isEmpty(dataTime)) {

            let time = language === languages.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;


            let firstLetter = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY').charAt(0).toUpperCase();
            let date = language === languages.VI ?
                firstLetter + moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY').slice(1)
                : moment.unix(+dataTime.date / 1000).locale('en').format('ddd- MM/DD/YYYY');
            return (`${time} - ${date}`)
        }
        return ''
    }
    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {

            let name = language === languages.VI ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;

            return name;
        }
        return ''
    }
    handleConfirmBooking = async () => {

        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })
        if (res && res.errCode === 0) {
            toast.success('Booking succeed');
            this.props.closeModalBooking();
        } else {
            toast.error('Booking failed');
        }

    }
    render() {

        let { isOpenModal, closeModalBooking, dataTime } = this.props

        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }
        // console.log('check state', dataTime);
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
                            <span className='left'><FormattedMessage id="patient.booking-modal.title" /></span>
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
                                    isShowPrice={true}
                                    isShowLinkDetail={false}
                                    dataTime={dataTime}
                                />
                            </div>

                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.full-name" /></label>
                                    <input className='form-control'
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'fullName')} />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.phone-number" /></label>
                                    <input className='form-control'
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                    <input className='form-control'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')} />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                    <input className='form-control'
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                                </div>
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                    <input className='form-control'
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')} />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className="form-control"
                                        value={this.state.currentDate}


                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}

                                    />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking-confirm' onClick={() => this.handleConfirmBooking()}><FormattedMessage id="patient.booking-modal.booking" /></button>
                            <button className='btn-booking-cancel' onClick={closeModalBooking}><FormattedMessage id="patient.booking-modal.cancel" /></button>
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
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fecthGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
