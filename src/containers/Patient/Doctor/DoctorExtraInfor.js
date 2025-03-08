import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import './DoctorExtraInfor.scss';
import { getExtraInforDoctorByIdService } from '../../../services/userService';
import { languages } from '../../../utils';
import NumberFormat from 'react-number-format';


import { FormattedMessage } from 'react-intl';
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }
    componentDidMount() {


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let data = await getExtraInforDoctorByIdService(this.props.doctorIdFromParent);
            if (data && data.errCode === 0)
                this.setState({
                    extraInfor: data.data
                })
        }

    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {

        let { language } = this.props;
        let { isShowDetailInfor, extraInfor } = this.state;
        console.log(extraInfor)
        return (
            <React.Fragment>
                <div className='doctor-extra-infor-container'>
                    <div className='content-up'>
                        <div className='text-address'><FormattedMessage id="patient.extra-infor-doctor.text-address" /></div>
                        <div className="name-clinic">{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                        <div className='detail-addr'>{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}</div>
                    </div>

                    <div className='content-down'>
                        {isShowDetailInfor === false &&
                            <div className='short-infor'><FormattedMessage id="patient.extra-infor-doctor.price" />
                                {extraInfor && extraInfor.priceTypeData && language === languages.VI &&
                                    <NumberFormat
                                        className='currency'
                                        value={extraInfor.priceTypeData.valueVi}
                                        displayType='text'
                                        thousandSeparator={true}
                                        suffix='vnđ'
                                    />
                                }
                                {extraInfor && extraInfor.priceTypeData && language === languages.EN &&
                                    <NumberFormat
                                        className='currency'
                                        value={extraInfor.priceTypeData.valueEn}
                                        displayType='text'
                                        thousandSeparator={true}
                                        suffix='$' />
                                }.
                                <span className='detail' onClick={() => this.showHideDetailInfor(true)}><FormattedMessage id="patient.extra-infor-doctor.see-detail" /></span>
                            </div>
                        }
                        {isShowDetailInfor === true &&
                            <>
                                <div className='title-price'>
                                    <FormattedMessage id="patient.extra-infor-doctor.price" />

                                </div>
                                <div className='body-price'>
                                    <div className='detail-price'>
                                        <span className='left'><FormattedMessage id="patient.extra-infor-doctor.price" /></span>
                                        <span className='right'>
                                            {extraInfor && extraInfor.priceTypeData && language === languages.VI ?
                                                <NumberFormat
                                                    className='currency'
                                                    value={extraInfor.priceTypeData.valueVi}
                                                    displayType='text'
                                                    thousandSeparator={true}
                                                    suffix='vnđ'
                                                />
                                                : ''
                                            }
                                            {extraInfor && extraInfor.priceTypeData && language === languages.EN ?
                                                <NumberFormat
                                                    className='currency'
                                                    value={extraInfor.priceTypeData.valueEn}
                                                    displayType='text'
                                                    thousandSeparator={true}
                                                    suffix='$' />
                                                : ''
                                            }

                                        </span>
                                    </div>

                                    <div className='note'> {extraInfor && extraInfor.note ? extraInfor.note : ''}</div>


                                </div>
                                <div className='payment'><FormattedMessage id="patient.extra-infor-doctor.payment" /> {extraInfor && extraInfor.paymentTypeData && language === languages.VI ? extraInfor.paymentTypeData.valueVi : extraInfor.paymentTypeData.valueEn}</div>
                                <div className='hide-price'>
                                    <span onClick={() => this.showHideDetailInfor(false)}><FormattedMessage id="patient.extra-infor-doctor.hide-price" /></span>
                                </div>


                            </>
                        }

                    </div>
                </div>
            </React.Fragment >


        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
