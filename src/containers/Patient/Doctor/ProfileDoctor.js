import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import { languages } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorByIdService } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import localization from "moment/locale/vi";
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }
    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorByIdService(id);
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            // let data = this.getInforDoctor(this.props.doctorId);
            // this.setState({
            //     dataProfile: data
            // })
        }
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        // console.log('check state profile', dataTime)
        if (dataTime && !_.isEmpty(dataTime)) {

            let time = language === languages.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;


            let firstLetter = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY').charAt(0).toUpperCase();
            let date = language === languages.VI ?
                firstLetter + moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY').slice(1)
                : moment.unix(+dataTime.date / 1000).locale('en').format('ddd- MM/DD/YYYY');
            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id="patient.booking-modal.price-booking" /></div>
                </>
            )
        }
        return <></>
    }
    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescription, dataTime } = this.props;
        let nameEn = '', nameVi = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.firstName} ${dataProfile.lastName}`
        }
        // console.log('check state profile', this.state)
        return (
            <React.Fragment>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    >

                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === languages.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDescription === true ?
                                <>
                                    {dataProfile.Markdown && dataProfile.Markdown.description &&
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }
                        </div>
                    </div>

                </div>
                <div className='price'>
                    <FormattedMessage id="patient.extra-infor-doctor.price" />
                    {dataProfile && dataProfile.Doctor_Infor && language === languages.VI ?
                        <NumberFormat
                            className='currency'
                            value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                            displayType='text'
                            thousandSeparator={true}
                            suffix='vnđ'
                        />
                        : ''
                    }
                    {dataProfile && dataProfile.Doctor_Infor && language === languages.EN ?
                        <NumberFormat
                            className='currency'
                            value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                            displayType='text'
                            thousandSeparator={true}
                            suffix='$' />
                        : ''
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
