import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import './DoctorExtraInfor.scss';
import { getDetailInforDoctor } from '../../../services/userService';
import { languages } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDateService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false
        }
    }
    componentDidMount() {


    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            //     let allDays = this.getArrDays(this.props.language);
            //     let res = await getScheduleDoctorByDateService(this.props.doctorIdFromParent, allDays[0].value)
            //     this.setState({
            //         allAvalableTime: res.data ? res.data : []
            //     })
            //     console.log(allDays)
        }

    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {
        let { language } = this.props;
        let { isShowDetailInfor } = this.state;
        return (
            <React.Fragment>
                <div className='doctor-extra-infor-container'>
                    <div className='content-up'>
                        <div className='text-address'>Địa chỉ phòng khám</div>
                        <div className="name-clinic">Phòng khám Chuyên khoa Da liễu</div>
                        <div className='detail-addr'>207, Phố Huế, Hai Bà Trưng, Hà Nội</div>
                    </div>
                    <div className='content-down'>
                        {isShowDetailInfor === false &&
                            <div className='short-infor'>GIÁ  KHÁM 250.000đ.<span onClick={() => this.showHideDetailInfor(true)}> Xem chi tiết</span></div>
                        }
                        {isShowDetailInfor === true &&
                            <>
                                <div className='title-price'>
                                    GIÁ KHÁM:
                                </div>
                                <div className='body-price'>
                                    <div className='detail-price'>
                                        <span className='left'>Giá Khám</span>
                                        <span className='right'>250.000đ</span>
                                    </div>

                                    <div className='note'>Được ưu tiên khám trước khi đặt qua HealCare. Giá khám cho người nước ngoài là 30 USD</div>


                                </div>
                                <div className='payment'>Người khám có thể thanh toán trực tiếp bằng tiền mặt hoặc quẹt thẻ</div>
                                <div className='hide-price'>
                                    <span onClick={() => this.showHideDetailInfor(false)}>Ẩn bảng giá</span>
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
